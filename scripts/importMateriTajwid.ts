/**
 * Import data materi Tajwid ke Supabase.
 *
 * Dua mode:
 *   1. Seed materi 9 hukum (default)
 *      npx tsx scripts/importMateriTajwid.ts
 *
 *   2. Ambil ayat dari EQuran.id per surah (melengkapi database ayat)
 *      npx tsx scripts/importMateriTajwid.ts surah 1 2 3
 *      npx tsx scripts/importMateriTajwid.ts surah 1-114
 *
 * Syarat:
 *   - supabase/migrations/001_materi_tajwid.sql sudah dijalankan.
 *   - .env.local punya SUPABASE_SERVICE_ROLE_KEY (hanya untuk script ini,
 *     jangan pernah dipakai di kode browser).
 *
 * Script ini aman dijalankan berulang kali karena semua penulisan memakai upsert.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { ambilSurah, bersihkanTeksArab, getAudioAyatUrl } from "@/lib/equran";
import type {
  Database,
  FileSeedMateriTajwid,
  SeedAyat,
  SeedMateri,
  SeedSurah,
} from "@/lib/typesMateriTajwid";

const SEED_PATH = path.join(
  process.cwd(),
  "supabase",
  "seed",
  "materi-tajwid.json",
);

// -----------------------------------------------------------------------------
// Membaca .env.local tanpa menambah dependensi
// -----------------------------------------------------------------------------

async function bacaEnvLocal(): Promise<Record<string, string>> {
  const isi = await fs.readFile(path.join(process.cwd(), ".env.local"), "utf8");

  const env: Record<string, string> = {};

  for (const baris of isi.split("\n")) {
    const bersih = baris.trim();
    if (bersih === "" || bersih.startsWith("#")) continue;

    const pemisah = bersih.indexOf("=");
    if (pemisah === -1) continue;

    const kunci = bersih.slice(0, pemisah).trim();
    const nilai = bersih.slice(pemisah + 1).trim().replace(/^["']|["']$/g, "");

    env[kunci] = nilai;
  }

  return env;
}

// -----------------------------------------------------------------------------
// Utilitas kecil
// -----------------------------------------------------------------------------

function pecahRentang(argumen: string[]): number[] {
  const nomor: number[] = [];

  for (const teks of argumen) {
    if (teks.includes("-")) {
      const [awal, akhir] = teks.split("-").map(Number);

      for (let i = awal; i <= akhir; i++) nomor.push(i);
    } else {
      nomor.push(Number(teks));
    }
  }

  return nomor;
}

function cekPanjang(teks: string, start: number, end: number): boolean {
  return (
    Number.isInteger(start) &&
    Number.isInteger(end) &&
    start >= 0 &&
    end > start &&
    end <= teks.length
  );
}

// -----------------------------------------------------------------------------
// Penulisan ke database
// -----------------------------------------------------------------------------

type DatabaseClient = SupabaseClient<Database>;

/** Tulis surah. id diisi dengan nomor surah, jadi tidak perlu melihat balik. */
async function tulisSurah(
  db: DatabaseClient,
  surah: Pick<SeedSurah, "kunci" | "nama_arab" | "nama_latin" | "jumlah_ayat">[],
) {
  const { error } = await db.from("surah").upsert(
    surah.map((s) => ({
      id: s.kunci,
      nama_arab: s.nama_arab,
      nama_latin: s.nama_latin,
      jumlah_ayat: s.jumlah_ayat,
    })),
    { onConflict: "id" },
  );

  if (error) throw new Error(`Gagal menulis surah: ${error.message}`);
}

/**
 * Tulis ayat, lalu kembalikan pemetaan (surah, nomor_ayat) -> ayat.id.
 *
 * `ayat.id` memakai identity, jadi harus dibaca balik dari database
 * untuk bisa dipakai oleh materi_tajwid.
 */
async function tulisAyat(
  db: DatabaseClient,
  ayat: (SeedAyat & { surah: number })[],
): Promise<Map<string, number>> {
  const baris = ayat.map((a) => ({
    surah_id: a.surah,
    nomor_ayat: a.nomor_ayat,
    teks_arab: a.teks_arab,
    terjemahan: a.terjemahan,
    audio_url: a.audio_url ?? getAudioAyatUrl(a.surah, a.nomor_ayat),
  }));

  const { data, error } = await db
    .from("ayat")
    .upsert(baris, { onConflict: "surah_id,nomor_ayat" })
    .select("id, surah_id, nomor_ayat");

  if (error) throw new Error(`Gagal menulis ayat: ${error.message}`);

  const peta = new Map<string, number>();

  for (const item of data ?? []) {
    peta.set(`${item.surah_id}:${item.nomor_ayat}`, item.id);
  }

  return peta;
}

/** Tulis materi dan kembalikan pemetaan kunci -> materi_tajwid.id. */
async function tulisMateri(
  db: DatabaseClient,
  materi: SeedMateri[],
  ayatId: Map<string, number>,
): Promise<Map<string, number>> {
  const baris = materi.map((m) => {
    const idAyat = ayatId.get(`${m.surah}:${m.nomor_ayat}`);

    if (!idAyat) {
      throw new Error(
        `Ayat ${m.surah}:${m.nomor_ayat} untuk materi "${m.kunci}" tidak ditemukan.`,
      );
    }

    return {
      ayat_id: idAyat,
      judul: m.judul,
      hukum_tajwid: m.hukum_tajwid,
      sub_hukum: m.sub_hukum,
      huruf_hukum: m.huruf_hukum,
      penjelasan: m.penjelasan,
      cara_membaca: m.cara_membaca,
      urutan: m.urutan,
      is_published: m.is_published,
    };
  });

  const { data: materiLama, error: errorBaca } = await db
    .from("materi_tajwid")
    .select("id, hukum_tajwid, sub_hukum, urutan")
    .in("hukum_tajwid", [...new Set(materi.map((item) => item.hukum_tajwid))]);

  if (errorBaca) {
    throw new Error(`Gagal membaca materi_tajwid: ${errorBaca.message}`);
  }

  const idPerKunci = new Map<string, number>();
  const materiBaru: { seed: SeedMateri; row: (typeof baris)[number] }[] = [];

  for (let index = 0; index < materi.length; index++) {
    const seed = materi[index];
    const row = baris[index];
    const cocok = (materiLama ?? []).filter(
      (item) =>
        item.hukum_tajwid === seed.hukum_tajwid &&
        item.sub_hukum === seed.sub_hukum &&
        item.urutan === seed.urutan,
    );

    if (cocok.length > 1) {
      throw new Error(
        `Ditemukan lebih dari satu materi ${seed.hukum_tajwid} ${seed.sub_hukum} urutan ${seed.urutan}; perbarui data duplikat secara manual.`,
      );
    }

    if (cocok.length === 0) {
      materiBaru.push({ seed, row });
      continue;
    }

    const { data: diperbarui, error } = await db
      .from("materi_tajwid")
      .update(row)
      .eq("id", cocok[0].id)
      .select("id")
      .single();

    if (error) throw new Error(`Gagal memperbarui materi_tajwid: ${error.message}`);

    idPerKunci.set(seed.kunci, diperbarui.id);
  }

  if (materiBaru.length > 0) {
    const barisBaru = materiBaru.map(({ row }) => row);
    const { data, error } = await db
      .from("materi_tajwid")
      .upsert(barisBaru, { onConflict: "ayat_id,urutan" })
      .select("id, ayat_id, urutan");

    if (error) throw new Error(`Gagal menulis materi_tajwid: ${error.message}`);

    for (const { seed, row } of materiBaru) {
      const saved = data?.find(
        (item) => item.ayat_id === row.ayat_id && item.urutan === row.urutan,
      );

      if (!saved) {
        throw new Error(
          `materi_tajwid untuk ayat ${row.ayat_id} urutan ${row.urutan} tidak terbaca balik setelah upsert.`,
        );
      }

      idPerKunci.set(seed.kunci, saved.id);
    }
  }

  return idPerKunci;
}

/** Tulis highlight setelah indeksnya dicek terhadap teks ayat. */
async function tulisHighlight(
  db: DatabaseClient,
  seed: FileSeedMateriTajwid,
  materiId: Map<string, number>,
) {
  const teksAyat = new Map<string, string>();

  for (const a of seed.ayat) {
    teksAyat.set(`${a.surah}:${a.nomor_ayat}`, a.teks_arab);
  }

  const baris: {
    materi_id: number;
    teks: string;
    start_index: number;
    end_index: number;
    label: string;
    audio_url: string | null;
    catatan: string | null;
    urutan: number;
  }[] = [];

  const dilewati: string[] = [];

  for (const h of seed.highlight_tajwid) {
    const idMateri = materiId.get(h.materi);
    const materi = seed.materi_tajwid.find((m) => m.kunci === h.materi);

    if (!idMateri || !materi) {
      dilewati.push(`${h.materi}: materi "${h.materi}" tidak ada`);
      continue;
    }

    const teks = teksAyat.get(`${materi.surah}:${materi.nomor_ayat}`) ?? "";

    if (!cekPanjang(teks, h.start_index, h.end_index)) {
      dilewati.push(
        `${materi.surah}:${materi.nomor_ayat} [${h.start_index}, ${h.end_index}) di luar teks ayat`,
      );
      continue;
    }

    // Potongan yang disimpan harus sama persis dengan isi teks ayat.
    if (teks.slice(h.start_index, h.end_index) !== h.teks) {
      dilewati.push(
        `${materi.surah}:${materi.nomor_ayat} teks highlight "${h.teks}" tidak cocok dengan ayat`,
      );
      continue;
    }

    baris.push({
      materi_id: idMateri,
      teks: h.teks,
      start_index: h.start_index,
      end_index: h.end_index,
      label: h.label,
      audio_url: h.audio_url,
      catatan: h.catatan,
      urutan: h.urutan,
    });
  }

  if (baris.length === 0) {
    console.log("Tidak ada highlight yang lolos validasi.");
    return;
  }

  const { error } = await db.from("highlight_tajwid").upsert(baris, {
    onConflict: "materi_id,start_index,end_index",
  });

  if (error) throw new Error(`Gagal menulis highlight_tajwid: ${error.message}`);

  console.log(`highlight_tajwid : ${baris.length} baris`);

  for (const pesan of dilewati) {
    console.log(`  DILEWATI       : ${pesan}`);
  }
}

// -----------------------------------------------------------------------------
// Mode 1: seed materi
// -----------------------------------------------------------------------------

async function importSeed(db: DatabaseClient) {
  const seed = JSON.parse(
    await fs.readFile(SEED_PATH, "utf8"),
  ) as FileSeedMateriTajwid;

  console.log("Sumber: supabase/seed/materi-tajwid.json");

  await tulisSurah(db, seed.surah);
  console.log(`surah            : ${seed.surah.length} baris`);

  const ayatId = await tulisAyat(
    db,
    seed.ayat.map((a) => ({ ...a, surah: a.surah })),
  );
  console.log(`ayat             : ${ayatId.size} baris`);

  const materiId = await tulisMateri(db, seed.materi_tajwid, ayatId);
  console.log(`materi_tajwid    : ${materiId.size} baris`);

  await tulisHighlight(db, seed, materiId);
}

// -----------------------------------------------------------------------------
// Mode 2: ambil ayat dari EQuran.id
// -----------------------------------------------------------------------------

async function importSurah(db: DatabaseClient, nomor: number[]) {
  for (const angka of nomor) {
    if (angka < 1 || angka > 114) {
      console.log(`  DILEWATI        : surah ${angka} di luar 1-114`);
      continue;
    }

    const surah = await ambilSurah(angka);

    await tulisSurah(db, [
      {
        kunci: surah.nomor,
        nama_arab: surah.namaArab,
        nama_latin: surah.namaLatin,
        jumlah_ayat: surah.jumlahAyat,
      },
    ]);

    await tulisAyat(
      db,
      surah.ayat.map((a) => ({
        surah: surah.nomor,
        nomor_ayat: a.nomorAyat,
        teks_arab: bersihkanTeksArab(a.teksArab),
        terjemahan: a.terjemahan,
        audio_url: a.audioUrl,
      })),
    );

    console.log(
      `surah ${String(surah.nomor).padStart(3, "0")} ${surah.namaLatin}: ${surah.ayat.length} ayat`,
    );
  }
}

// -----------------------------------------------------------------------------
// Entry point
// -----------------------------------------------------------------------------

async function main() {
  const env = await bacaEnvLocal();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRole) {
    console.error(
      "NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum ada di .env.local",
    );
    process.exit(1);
  }

  const db: DatabaseClient = createClient<Database>(url, serviceRole, {
    auth: { persistSession: false },
  });

  const [, , mode, ...sisa] = process.argv;

  if (mode === "surah") {
    await importSurah(db, pecahRentang(sisa));
  } else {
    await importSeed(db);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
