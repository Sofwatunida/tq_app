/**
 * Pengambil data ayat dari EQuran.id.
 *
 * File ini HANYA dipakai oleh `scripts/importMateriTajwid.ts`.
 * Aplikasi tidak pernah memanggil EQuran.id saat halaman dibuka;
 * halaman materi selalu membaca dari tabel Supabase.
 */

export type AyatEquran = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  terjemahan: string;
  audioUrl: string;
};

export type SurahEquran = {
  nomor: number;
  namaArab: string;
  namaLatin: string;
  jumlahAyat: number;
  ayat: AyatEquran[];
};

const BASE_SURAH = "https://equran.id/api/v2/surat";
const QARI = "Misyari-Rasyid-Al-Afasi";

/**
 * Tanda waqf (tanda berhenti) dibuang supaya teks ayat rapi.
 *
 * Tanda iqlab (U+06E2 / U+06E3) sengaja dipertahankan karena tanda itu
 * bagian dari hukum bacaan yang sedang diajarkan.
 */
export function bersihkanTeksArab(teks: string): string {
  return teks
    .replace(/[\u06D6-\u06DC\u06DD\u06DE\u06E9\u08D0-\u08D6]/g, "")
    .replace(/[\u06E0\u06E1\u06E3\u06E4\u06E5\u06E6\u06E7\u06E8\u06EA\u06EB\u06EC\u06ED]/g, "")
    .replace(/\u0670/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** URL audio ayat utuh dari CDN EQuran. */
export function getAudioAyatUrl(surah: number, ayat: number): string {
  const nomorSurah = String(surah).padStart(3, "0");
  const nomorAyat = String(ayat).padStart(3, "0");
  return `https://cdn.equran.id/audio-partial/${QARI}/${nomorSurah}${nomorAyat}.mp3`;
}

/** Ambil daftar seluruh surah (114). Dipakai untuk mengecek kelengkapan import. */
export async function ambilDaftarSurah(): Promise<
  { nomor: number; namaArab: string; namaLatin: string; jumlahAyat: number }[]
> {
  const response = await fetch(`${BASE_SURAH}`);

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil daftar surah dari EQuran.id (HTTP ${response.status}).`,
    );
  }

  const json = (await response.json()) as {
    data: { nomor: number; namaArab: string; namaLatin: string; jumlahAyat: number }[];
  };

  return json.data;
}

/** Ambil satu surah lengkap beserta semua ayatnya. */
export async function ambilSurah(nomor: number): Promise<SurahEquran> {
  const response = await fetch(`${BASE_SURAH}/${nomor}`);

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil surah ${nomor} dari EQuran.id (HTTP ${response.status}).`,
    );
  }

  const json = (await response.json()) as {
    data: {
      nomor: number;
      namaArab: string;
      namaLatin: string;
      jumlahAyat: number;
      ayat: {
        nomorAyat: number;
        teksArab: string;
        teksLatin: string;
        terjemahan: string;
        audio: string;
      }[];
    };
  };

  const surah = json.data;

  return {
    nomor: surah.nomor,
    namaArab: surah.namaArab,
    namaLatin: surah.namaLatin,
    jumlahAyat: surah.jumlahAyat,
    ayat: surah.ayat.map((ayat) => ({
      nomorAyat: ayat.nomorAyat,
      teksArab: bersihkanTeksArab(ayat.teksArab),
      teksLatin: ayat.teksLatin,
      terjemahan: ayat.terjemahan,
      audioUrl: ayat.audio || getAudioAyatUrl(surah.nomor, ayat.nomorAyat),
    })),
  };
}
