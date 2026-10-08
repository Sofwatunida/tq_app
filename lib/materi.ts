import { daftarMateri } from "@/constant/constMateri";
import { supabase } from "@/lib/supabase/supabase";
import { bersihkanHighlight } from "@/lib/highlightTajwid";
import type {
  BarisMateriTajwid,
  HasilMateriTajwid,
  MateriUi,
  SubMateriUi,
} from "@/lib/typesMateriTajwid";

/**
 * Query materi tajwid dari Supabase.
 *
 * `ayat` diambil sekaligus dengan `surah`-nya, dan `highlight_tajwid`
 * diambil lewat relasi many-to-one. Jadi halaman materi hanya perlu
 * satu permintaan, bukan N+1.
 */
const SELECT_MATERI = `
  id,
  judul,
  hukum_tajwid,
  sub_hukum,
  huruf_hukum,
  penjelasan,
  cara_membaca,
  urutan,
  is_published,
  ayat (
    id,
    surah_id,
    nomor_ayat,
    teks_arab,
    terjemahan,
    audio_url,
    surah ( id, nama_arab, nama_latin, jumlah_ayat )
  ),
  highlight_tajwid ( id, teks, start_index, end_index, label, audio_url, catatan, urutan )
`;

/**
 * Ubah satu baris database menjadi bentuk yang dipakai komponen.
 *
 * `id` subMateri memakai urutan di dalam kelompok, bukan id database.
 * Alasannya: `progress_materi` memakai (materi_id, submateri_id) dan
 * datanya sudah memakai penomoran itu, jadi progress pengguna tidak perlu
 * dimigrasikan saat materi dipindah ke database.
 */
function keSubMateri(
  baris: BarisMateriTajwid,
  nomorUrut: number,
): SubMateriUi {
  const ayat = baris.ayat;
  const surah = ayat?.surah;
  const teksAyat = ayat?.teks_arab ?? "";

  const highlight = (baris.highlight_tajwid ?? [])
    .slice()
    .sort((a, b) => a.urutan - b.urutan)
    .map((h) => ({
      teks: h.teks,
      startIndex: h.start_index,
      endIndex: h.end_index,
      label: h.label,
      audioUrl: h.audio_url,
      catatan: h.catatan,
    }));

  // Buang highlight yang tidak cocok dengan teks ayat sekarang, supaya
  // komponen tidak pernah menampilkan potongan yang salah.
  const highlightValid = bersihkanHighlight(teksAyat.length, highlight);

  // `ayat` dipakai sebagai judul singkat, sama seperti data lama.
  const cuplikan = highlightValid.map((h) => h.teks).join(" ");

  return {
    id: nomorUrut,
    idMateri: baris.id,
    judul: baris.judul,
    pengertian: baris.penjelasan,
    huruf: baris.huruf_hukum ?? [],
    ayat: cuplikan,
    cara_baca: baris.cara_membaca,
    audio_url: ayat?.audio_url ?? "",
    selesai: false,
    ayatPenuh: teksAyat,
    highlight: highlightValid,
    ref: surah ? `${surah.nama_latin}: ${ayat.nomor_ayat}` : "",
    hukum: baris.hukum_tajwid,
  };
}

/**
 * Kelompokkan baris materi berdasarkan hukum induknya.
 *
 * Urutan kelompok mengikuti materi pertama dari tiap hukum, sehingga
 * urutan tampilannya sama dengan urutan materi ajar di seed.
 */
function keMateriUi(baris: BarisMateriTajwid[]): MateriUi[] {
  const urutanKelompok = new Map<string, number>();
  const isiKelompok = new Map<string, BarisMateriTajwid[]>();

  const terurut = [...baris].sort((a, b) => a.urutan - b.urutan);

  for (const item of terurut) {
    const hukum = item.hukum_tajwid;

    if (!urutanKelompok.has(hukum)) {
      urutanKelompok.set(hukum, urutanKelompok.size + 1);
      isiKelompok.set(hukum, []);
    }

    isiKelompok.get(hukum)!.push(item);
  }

  return [...urutanKelompok.keys()].map((hukum) => {
    const isi = isiKelompok.get(hukum) ?? [];

    return {
      id: urutanKelompok.get(hukum)!,
      judul: hukum,
      status: "Terkunci",
      subMateri: isi.map((item, index) => keSubMateri(item, index + 1)),
    };
  });
}

/** Data lama, dipakai kalau tabel belum terisi atau query gagal. */
function dariDataLama(catatan: string): HasilMateriTajwid {
  return {
    materi: daftarMateri as MateriUi[],
    dariDatabase: false,
    catatan,
  };
}

/**
 * Ambil materi tajwid dari Supabase.
 *
 * Kalau tabelnya belum dibuat, atau belum ada materi yang dipublikasikan,
 * fungsi ini mengembalikan `daftarMateri` yang lama supaya halaman tetap jalan.
 */
export async function ambilMateriTajwid(): Promise<HasilMateriTajwid> {
  const { data, error } = await supabase
    .from("materi_tajwid")
    .select(SELECT_MATERI)
    .eq("is_published", true)
    .order("urutan", { ascending: true });

  if (error) {
    return dariDataLama(`Query materi_tajwid gagal: ${error.message}`);
  }

  // `supabase` dibuat tanpa tipe database, jadi hasil select perlu diberi bentuk.
  const baris = (data ?? []) as unknown as BarisMateriTajwid[];

  if (baris.length === 0) {
    return dariDataLama("Belum ada materi_tajwid yang dipublikasikan.");
  }

  // Buang baris yang ayatnya tidak lengkap supaya halaman tidak error.
  const utuh = baris.filter((item) => Boolean(item.ayat?.teks_arab));

  if (utuh.length === 0) {
    return dariDataLama("Materi_tajwid yang ada belum punya teks ayat.");
  }

  return {
    materi: keMateriUi(utuh),
    dariDatabase: true,
    catatan: null,
  };
}
