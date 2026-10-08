# Sistem Materi Tajwid

Dokumen ini menjelaskan cara kerja, cara setup, dan cara menambah materi Tajwid
pada aplikasi ini. Semua materi dibaca dari **Supabase**, bukan dari file statis.

---

## 1. Ringkasan

Dulu data materi Tajwid ditulis manual di `constant/constMateri.ts` sebagai
cuplikan pendek (mis. `مِنْ وَالٍ`). Sekarang setiap materi menempel pada satu
ayat utuh dari Al-Qur'an, lengkap dengan:

- teks ayat Arab + terjemahan Indonesia,
- bagian ayat yang menunjukkan hukum tajwid (highlight),
- nama hukum di setiap bagian highlight,
- audio ayat utuh dan audio per kata yang di-highlight.

Ayat dan highlight disimpan di database supaya bisa ditambah tanpa mengubah kode.

---

## 2. Alur data

```
Halaman materi  ──►  lib/materi.ts  ──►  Supabase
                                        surah
                                          └─► ayat
                                                └─► materi_tajwid
                                                      └─► highlight_tajwid

Import (sekali) ──►  scripts/importMateriTajwid.ts  ──►  EQuran.id  ──►  Supabase
```

- EQuran.id hanya dipakai **saat import**, lewat `scripts/importMateriTajwid.ts`.
- Saat pengguna membuka halaman materi, tidak ada permintaan ke EQuran.id.
- Kalau tabel belum ada atau belum terisi, `lib/materi.ts` otomatis memakai
  `constant/constMateri.ts` supaya halaman tetap bisa dibuka.

---

## 3. Struktur tabel

| Tabel | Isi | Kunci penting |
| --- | --- | --- |
| `surah` | 1 baris per surah | `id` = nomor surah (1-114) |
| `ayat` | 1 baris per ayat | unik pada `(surah_id, nomor_ayat)` |
| `materi_tajwid` | 1 baris per materi hukum | FK ke `ayat.id` |
| `highlight_tajwid` | 1 baris per potongan highlight | FK ke `materi_tajwid.id` |

Relasinya:

```
surah 1 ────► ayat 1..N ────► materi_tajwid 1..M ────► highlight_tajwid 1..K
```

Satu ayat boleh punya lebih dari satu materi. Contohnya `20:4` dipakai oleh
`Idzhar Halqi`, sekaligus dipakai sebagai contoh **Ikhfa** di highlight kedua.

---

## 4. Daftar file

| File | Fungsi |
| --- | --- |
| `supabase/migrations/001_materi_tajwid.sql` | Membuat tabel, index, RLS, dan bucket storage |
| `supabase/seed/materi-tajwid.json` | Data awal 9 materi + 10 highlight |
| `lib/typesMateriTajwid.ts` | Semua tipe data |
| `lib/highlightTajwid.ts` | Memotong ayat menjadi bagian highlight |
| `lib/equran.ts` | Pengambil data dari EQuran.id (khusus import) |
| `lib/materi.ts` | Query Supabase + fallback ke data lama |
| `components/Materi/AyatTajwid.tsx` | Menampilkan ayat + highlight + tombol audio |
| `components/Materi/LearnMateri.tsx` | Memakai `AyatTajwid`, tampilan lain tidak berubah |
| `app/(main)/materi/page.tsx` | Memanggil `ambilMateriTajwid()` |
| `scripts/importMateriTajwid.ts` | Menulis data ke Supabase |

---

## 5. Cara setup Supabase

### Langkah 1 — Jalankan migration

1. Buka **Supabase Dashboard > SQL Editor > New query**.
2. Tempel seluruh isi `supabase/migrations/001_materi_tajwid.sql`.
3. Klik **Run**.

File ini aman dijalankan berulang kali. Yang dibuat:

- 4 tabel (`surah`, `ayat`, `materi_tajwid`, `highlight_tajwid`),
- index untuk query halaman materi,
- trigger `updated_at`,
- RLS: semua tabel bisa dibaca anon, hanya bisa ditulis service role,
- storage bucket `audio-tajwid` (publik).

### Langkah 2 — Siapkan service role key

Buka **Project Settings > API**, salin **service_role** key, lalu tambahkan ke
`.env.local`:

```
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

> Service role punya akses penuh. Jangan pernah menaruhnya di kode yang berjalan
> di browser, dan jangan di-commit ke git.

### Langkah 3 — Import data

```bash
npm run import:materi
```

Perintah di atas mengisi 9 surah, 9 ayat, 9 materi, dan 10 highlight.

### Langkah 4 — Cek hasilnya

Buka tabel `materi_tajwid` di Dashboard. `ayat_id` harus terisi semua.
Kalau ada baris yang gagal, script mencetak baris mana yang dilewati dan
alasannya.

---

## 6. Cara menambah ayat lengkap

Untuk mengisi ayat dari seluruh Quran (mis. untuk fitur pencarian ayat nanti):

```bash
# surah tertentu
npx tsx scripts/importMateriTajwid.ts surah 36 67

# seluruh Quran
npx tsx scripts/importMateriTajwid.ts surah 1-114
```

Yang terjadi:

1. Ambil surah dari `https://equran.id/api/v2/surat/{nomor}`.
2. Tulis 1 baris `surah`.
3. Tulis semua ayatnya dengan `upsert` pada `(surah_id, nomor_ayat)`.

Audio ayat memakai CDN EQuran:

```
https://cdn.equran.id/audio-partial/Misyari-Rasyid-Al-Afasi/014016.mp3
```

---

## 7. Cara menambah materi baru

Contoh: menambah materi baru untuk `Alif Lam Qamariyah` di ayat yang lain.

### 7.1 Pastikan ayatnya sudah ada

Kalau ayatnya belum ada di tabel `ayat`, lebih dulu jalankan perintah di
[Bagian 6](#6-cara-menambah-ayat-lengkap).

### 7.2 Tulis di file seed

Buka `supabase/seed/materi-tajwid.json` dan tambahkan:

```json
{
  "kunci": "alif-lam-qamariyah-2",
  "surah": 2,
  "nomor_ayat": 255,
  "judul": "Alif Lam Qamariyah",
  "hukum_tajwid": "Alif Lam",
  "sub_hukum": "Qamariyah",
  "huruf_hukum": ["ا", "ب", "ج", "ح", "خ", "ع", "غ", "ف", "ق", "ك", "م", "و", "ه", "ي"],
  "penjelasan": "Alif Lam Qamariyah adalah hukum bacaan alif lam yang dibaca jelas karena bertemu huruf qamariyah.",
  "cara_membaca": "Bacalah huruf lam dengan jelas, lalu lanjutkan ke huruf setelahnya.",
  "urutan": 10,
  "is_published": true
}
```

### 7.3 Hitung indeks highlight

`highlight_tajwid` menyimpan posisi karakter di dalam `ayat.teks_arab`:

- `start_index` = indeks karakter **awal**,basis 0.
- `end_index` = indeks karakter **setelah** bagian terakhir.

Contohnya `"مِنْ شَرِّ مَا خَلَقَ"`, bagian `شَرِّ`:

```
م = 0
ِ = 1
ن = 2   ← start_index
ْ = 3
(spasi) = 4
ش = 5   ← karakter pertama yang ditampilkan
...
م = 9   ← end_index
```

Cara paling aman: pakai Node, bukan menghitung manual.

```js
// cek-indeks.mjs
const teks = "مِنْ شَرِّ مَا خَلَقَ";
console.log([...teks].map((c, i) => `${i}: ${c}`).join("\n"));
```

Atau pakai `indexOf`:

```js
const teks = "مِنْ شَرِّ مَا خَلَقَ";
const awal = teks.indexOf("شَرِّ");
console.log(awal, awal + "شَرِّ".length); // 5 9
```

Aturannya: `teks.slice(start_index, end_index)` **harus sama persis** dengan
`highlight_tajwid.teks`. Script import akan menolak highlight yang tidak cocok,
danApplicasi juga membuang highlight yang tidak valid saat merender.

### 7.4 Tambahkan highlight-nya

```json
{
  "materi": "alif-lam-qamariyah-2",
  "urutan": 1,
  "teks": "اللَّهُ",
  "start_index": 0,
  "end_index": 5,
  "label": "Alif Lam Qamariyah",
  "audio_url": "https://cdn.islamic.app/quran/audio-word/2/255/1.mp3",
  "catatan": "Alif lam bertemu huruf lam."
}
```

### 7.5 Import ulang

```bash
npm run import:materi
```

Semua penulisan memakai `upsert`, jadi materi lama tidak terduplikasi.

---

## 8. Cara memperbarui data lama

Kalau `ayat.teks_arab` berubah (mis. karena sumber ayat diperbarui), semua indeks
highlight jadi bergeser. Langkah yang benar:

1. Import ulang ayatnya lewat `scripts/importMateriTajwid.ts surah {nomor}`.
2. Hitung ulang `start_index`/`end_index` setiap highlight yang menempel di
   ayat tersebut.
3. Import ulang seed.

Indeks highlight **tidak boleh** diperbaiki sebagian, karena `ayat.teks_arab` dan
`highlight_tajwid` harus selalu berasal dari sumber yang sama.

> Karena itu, teks ayat sebaiknya tidak diedit manual di Dashboard. Ayat
> diperbarui lewat `scripts/importMateriTajwid.ts`.

---

## 9. Struktur `highlight_tajwid`

| Kolom | Tipe | Arti |
| --- | --- | --- |
| `materi_id` | bigint | Materi pemilik highlight |
| `teks` | text | Potongan ayat, harus sama dengan hasil `slice` |
| `start_index` | integer | Indeks karakter awal (basis 0) |
| `end_index` | integer | Indeks karakter setelah bagian terakhir |
| `label` | text | Nama hukum, mis. `"Ikhfa Syafawi"` |
| `audio_url` | text | Audio kata yang di-highlight |
| `catatan` | text | Catatan kecil, muncul sebagai tooltip |
| `urutan` | integer | Urutan highlight dalam satu materi |

Aturan validasi:

- `start_index >= 0`
- `end_index > start_index`
- `end_index <= panjang(ayat.teks_arab)`
- highlight tidak boleh saling tumpang tindih

Empat aturan terakhir dijaga dua kali: oleh `CHECK` di database, dan oleh
`bersihkanHighlight()` di `lib/highlightTajwid.ts`.

---

## 10. Audio

Ada dua jenis audio di halaman materi:

| Jenis | Sumber | Dipakai untuk |
| --- | --- | --- |
| Ayat utuh | `cdn.equran.id/audio-partial/...` | Pemutar `<audio>` di bawah ayat |
| Per kata | `cdn.islamic.app/quran/audio-word/...` | Tombol kecil di samping bagian highlight |

Tidak ada autoplay. Suara hanya keluar setelah tombol ditekan.

Audio per kata juga punya format URL yang mudah dibentuk:

```
https://cdn.islamic.app/quran/audio-word/{surah}/{ayat}/{posisiKata}.mp3
```

Helper-nya sudah ada di `lib/quranAudio.ts`:

```ts
import { getWordAudioUrl } from "@/lib/quranAudio";

getWordAudioUrl(2, 255, 1);
```

Kalau nanti ingin mengunggah audio sendiri, simpan di bucket `audio-tajwid` lalu
isi kolom `highlight_tajwid.audio_url` dengan URL publik dari bucket tersebut.

---

## 11. Fallback ke data lama

`lib/materi.ts` mengembalikan `daftarMateri` yang lama kalau:

- tabel `materi_tajwid` belum dibuat,
- belum ada materi dengan `is_published = true`,
- query gagal (jaringan, RLS, dsb).

Alasannya ditulis ke `catatan` dan hanya dicetak ke console, jadi tidak muncul
ke pengguna. Halaman materi tetap bisa dibuka seperti sebelumnya.

Untuk memeriksa sumber mana yang terpakai, lihat `catatan` di console browser.

---

## 12. Menambah hukum baru

Tidak ada kode yang perlu diubah. Yang perlu dilakukan:

1. Tambah kolom `huruf_hukum` dengan huruf pemicunya.
2. Tambah `penjelasan` dan `cara_membaca`.
3. Pakai `hukum_tajwid` yang baru bila ingin kelompok baru, atau `hukum_tajwid`
   yang sudah ada untuk menambah sub hukum.

Contoh kelompok baru:

```json
{
  "kunci": "qalqalah",
  "surah": 2,
  "nomor_ayat": 2,
  "judul": "Qalqalah",
  "hukum_tajwid": "Qalqalah",
  "sub_hukum": "Qalqalah",
  "huruf_hukum": ["ب", "ت", "ث", "ج", "د", "ذ"],
  "penjelasan": "Qalqalah adalah hukum ...",
  "cara_membaca": "Tutupkan mimsakinah dengan pantulan suara hamsah.",
  "urutan": 11,
  "is_published": true
}
```

Halaman materi otomatis membuat kelompok baru dan menaruhnya setelah
`Alif Lam`, mengikuti nilai `urutan`.

---

## 13. Urutan tampil

- `materi_tajwid.urutan` = urutan materi ajar secara global (1, 2, 3, ...).
- Urutan **kelompok** dihitung dari materi pertama yang memakai `hukum_tajwid`
  tersebut. Jadi `urutan` pertama untuk `Idgham` menentukan posisi kelompok
  `Idgham` di menu.

Dengan data seed sekarang:

```
1. Idgham    -> Idgham Bighunnah, Idgham Bilaghunnah
2. Iqlab     -> Iqlab
3. Idzhar    -> Idzhar Halqi, Idzhar Syafawi
4. Ikhfa     -> Ikhfa Haqiqi, Ikhfa Syafawi
5. Alif Lam  -> Alif Lam Qamariyah, Alif Lam Syamsiyah
```

---

## 14. Progress pengguna

`progress_materi` tidak diubah sama sekali. Yang dipakai:

- `materi_id` = nomor urut kelompok (`1..5`).
- `submateri_id` = urutan submateri **di dalam kelompoknya** (`1`, `2`, ...).

Karenanya `materi_tajwid.id` dari database sengaja tidak dipakai sebagai
`submateri_id`. Dengan begitu progress yang sudah ada tetap berlaku tanpa
migrasi data, dan materi baru bisa disisipkan tanpa menggeser nomor lama.

Kalau nanti `progress_materi` sudah tidak dipakai, tidak ada perubahan lain yang
perlu dilakukan.

---

## 15. Menjalankan ulang import

```bash
npm run import:materi
```

Yang aman:

- `surah` di-`upsert` pada `id` (nomor surah).
- `ayat` di-`upsert` pada `(surah_id, nomor_ayat)`.
- `materi_tajwid` di-`upsert` pada `ayat_id`.
- `highlight_tajwid` di-`upsert` pada `(materi_id, start_index, end_index)`.

Artinya menjalankan berkali-kali tidak menghasilkan duplikat.

> Menghapus materi tidak dilakukan oleh script. Hapus manual di Dashboard atau
> set `is_published = false` supaya tidak muncul di halaman.

---

## 16. Troubleshooting

| Gejala | Penyebab | Solusi |
| --- | --- | --- |
| Halaman masih pakai data lama | Tabel belum dibuat / belum ada data | Jalankan migration lalu `npm run import:materi` |
| Muncul `relation "materi_tajwid" does not exist` | Migration belum dijalankan | Buka `supabase/migrations/001_materi_tajwid.sql` di SQL Editor |
| `Invalid API key` saat import | `SUPABASE_SERVICE_ROLE_KEY` salah | Salin ulang dari Project Settings > API |
| Highlight tidak muncul | `start_index` / `end_index` salah | `slice` teks ayat dan cocokkan dengan kolom `teks` |
| Teks highlight berbeda dari ayat | Teks ayat berubah setelah indeks dihitung | Hitung ulang indeks, lalu import ulang |
| Audio tidak bunyi | URL salah atau format tidak didukung | Cek URL audio, pastikan berakhiran `.mp3` |
| `Row Level Security` error | Policy tidak ada | Jalankan ulang bagian 7 pada migration |

Cek cepat apakah data sudah masuk:

```sql
select count(*) from surah;
select count(*) from ayat;
select count(*) from materi_tajwid;
select count(*) from highlight_tajwid;
```

---

## 17. Yang tidak diubah

Supaya tidak ada regresi, bagian berikut sengaja dibiarkan apa adanya:

- `constant/constMateri.ts` — masih dipakai sebagai fallback.
- `app/(main)/materi/page.tsx` — alur progress, lock, dan navigasi tidak berubah.
- `components/Materi/PilihMateri.tsx` dan `ListMateri.tsx` — tampilan tidak diubah.
- `components/Materi/FahamMateri.tsx` — tombol "Faham" tidak diubah.
- Tabel `progress_materi` dan `hasil_kuis` — tidak ada perubahan skema.
- Halaman kuis dan halaman lain di luar `/materi`.

Satu perbedaan visual yang disengaja: pada `Idzhar Syafawi`, kotak huruf
sekarang berisi 24 huruf (data sebelumnya salah hanya berisi `م` dan `ب`),
sehingga kotaknya lebih banyak.

---

## 18. Catatan tentang data

- Ayat berasal dari [EQuran.id](https://equran.id) dengan gaya penulisan Arab
  non-Uthmani. Tanda waqf dibuang, tanda iqlab (ۢ) dipertahankan.
- Highlighting ditentukan oleh kode, **bukan** oleh AI. Pola dihitung dari
  teks ayat di `lib/highlightTajwid.ts`, sedangkan `label`, `penjelasan`, dan
  `start_index`/`end_index` ditulis manual lalu divalidasi ulang oleh
  `scripts/importMateriTajwid.ts` sebelum disimpan.
- Sebelum materi dianggap final, `penjelasan`, `cara_membaca`, `label`, dan
  indeks highlight sebaiknya ditinjau langsung oleh guru.
- `EQuran.id` tidak menyediakan endpoint pencarian yang stabil, jadi pencarian
  ayat (jika nanti dibuat) sebaiknya dilakukan di dalam database, bukan
  dengan memanggil API setiap kali pengguna mengetik.
