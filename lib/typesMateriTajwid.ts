/**
 * Tipe data untuk sistem materi Tajwid.
 *
 * `SubMateriUi` sengaja memakai nama field yang sama dengan data lama di
 * `constant/constMateri.ts` supaya halaman materi dan komponennya
 * tidak perlu diubah strukturnya.
 */

// -----------------------------------------------------------------------------
// Bentuk hasil query Supabase
// -----------------------------------------------------------------------------

export type BarisSurah = {
  id: number;
  nama_arab: string;
  nama_latin: string;
  jumlah_ayat: number;
};

export type BarisAyat = {
  id: number;
  surah_id: number;
  nomor_ayat: number;
  teks_arab: string;
  terjemahan: string | null;
  audio_url: string | null;
};

export type BarisHighlightTajwid = {
  id: number;
  materi_id: number;
  teks: string;
  start_index: number;
  end_index: number;
  label: string;
  audio_url: string | null;
  catatan: string | null;
  urutan: number;
};

/** Satu baris materi_tajwid lengkap dengan ayat, surah, dan highlight-nya. */
export type BarisMateriTajwid = {
  id: number;
  judul: string;
  hukum_tajwid: string;
  sub_hukum: string;
  huruf_hukum: string[] | null;
  penjelasan: string;
  cara_membaca: string;
  urutan: number;
  is_published: boolean;
  ayat: BarisAyat & { surah: BarisSurah | null };
  highlight_tajwid: BarisHighlightTajwid[];
};

// -----------------------------------------------------------------------------
// Bentuk yang dipakai komponen UI (sama dengan data lama)
// -----------------------------------------------------------------------------

export type HighlightUi = {
  teks: string;
  startIndex: number;
  endIndex: number;
  label: string;
  audioUrl: string | null;
  catatan: string | null;
};

/** Satu submateri di halaman materi. */
export type SubMateriUi = {
  /**
   * Nomor urut di dalam kelompoknya, bukan id database.
   * Dipakai sebagai `progress_materi.submateri_id` supaya progress lama tetap berlaku.
   */
  id: number;
  /** Id asli di tabel materi_tajwid. */
  idMateri: number;
  judul: string;
  pengertian: string;
  huruf: string[];
  /** Cuplikan singkat, sama seperti data lama. */
  ayat: string;
  latin: string;
  arti: string;
  cara_baca: string;
  /** Audio ayat utuh untuk pemutar utama. String kosong kalau tidak ada. */
  audio_url: string;
  selesai: boolean;
  /** Ayat utuh, termasuk bagian yang tidak di-highlight. */
  ayatPenuh: string;
  /** Potongan ayat yang wajib ditampilkan dengan penekanan. */
  highlight: HighlightUi[];
  /** Sumber ayat, mis. "Al-Ibrahim: 16". */
  ref: string;
  /** Hukum induk, mis. "Idgham". */
  hukum: string;
};

/** Satu kelompok hukum di halaman "Pilih Materi". */
export type MateriUi = {
  /** Nomor urut kelompok (1, 2, 3, ...), bukan id database. */
  id: number;
  judul: string;
  status: string;
  subMateri: SubMateriUi[];
};

export type HasilMateriTajwid = {
  materi: MateriUi[];
  /** true kalau data diambil dari Supabase, false kalau pakai data lama. */
  dariDatabase: boolean;
  /** Alasan memakai data lama. Hanya untuk dibaca di console. */
  catatan: string | null;
};

// -----------------------------------------------------------------------------
// Bentuk file seed
// -----------------------------------------------------------------------------

export type SeedSurah = {
  kunci: number;
  nama_arab: string;
  nama_latin: string;
  jumlah_ayat: number;
};

export type SeedAyat = {
  surah: number;
  nomor_ayat: number;
  teks_arab: string;
  terjemahan: string | null;
  audio_url: string | null;
};

export type SeedMateri = {
  kunci: string;
  surah: number;
  nomor_ayat: number;
  judul: string;
  hukum_tajwid: string;
  sub_hukum: string;
  huruf_hukum: string[];
  penjelasan: string;
  cara_membaca: string;
  urutan: number;
  is_published: boolean;
};

export type SeedHighlight = {
  materi: string;
  urutan: number;
  teks: string;
  start_index: number;
  end_index: number;
  label: string;
  audio_url: string | null;
  catatan: string | null;
};

export type FileSeedMateriTajwid = {
  surah: SeedSurah[];
  ayat: SeedAyat[];
  materi_tajwid: SeedMateri[];
  highlight_tajwid: SeedHighlight[];
};

// -----------------------------------------------------------------------------
// Skema database untuk script import
//
// `lib/supabase/supabase.ts` sengaja tidak diubah, jadi tipe ini dipakai
// khusus oleh `scripts/importMateriTajwid.ts` yang memakai service role.
// Hanya kolom yang dipakai script ini yang didefinisikan.
// -----------------------------------------------------------------------------

type KolomSurah = {
  id: number;
  nama_arab: string;
  nama_latin: string;
  jumlah_ayat: number;
  created_at: string;
  updated_at: string;
};

type KolomAyat = {
  id: number;
  surah_id: number;
  nomor_ayat: number;
  teks_arab: string;
  terjemahan: string | null;
  audio_url: string | null;
  created_at: string;
  updated_at: string;
};

type KolomMateriTajwid = {
  id: number;
  ayat_id: number;
  judul: string;
  hukum_tajwid: string;
  sub_hukum: string;
  huruf_hukum: string[];
  penjelasan: string;
  cara_membaca: string;
  urutan: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

type KolomHighlightTajwid = {
  id: number;
  materi_id: number;
  teks: string;
  start_index: number;
  end_index: number;
  label: string;
  audio_url: string | null;
  catatan: string | null;
  urutan: number;
  created_at: string;
  updated_at: string;
};

/** Bentuk tabel generik supabase-js. */
type Tabel<Baris extends Record<string, unknown>> = {
  Row: Baris;
  Insert: Omit<Baris, "id" | "created_at" | "updated_at"> &
    Partial<Pick<Baris, "id" | "created_at" | "updated_at">>;
  Update: Partial<Baris>;
  Relationships: [];
};
export type Database = {
  public: {
    Tables: {
      surah: Tabel<KolomSurah>;
      ayat: Tabel<KolomAyat>;
      materi_tajwid: Tabel<KolomMateriTajwid>;
      highlight_tajwid: Tabel<KolomHighlightTajwid>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
