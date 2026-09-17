# Panduan Audio Materi Tanpa API Berbayar

Dokumen ini menjelaskan semua perubahan yang ditambahkan agar halaman materi bisa menampilkan audio pelafalan dengan sumber gratis, baik dari CDN gratis maupun file audio yang kamu upload sendiri nanti.

## Tujuan

Kita ingin:

- tiap sub materi memiliki audio pelafalan
- audio tampil otomatis di halaman materi
- data materi mudah ditambah tanpa repot
- tidak memakai API berbayar

---

## 1. File data materi

File utama: [constant/constMateri.ts](constant/constMateri.ts)

Fungsi file ini adalah sumber data utama untuk materi. Di sini kita menyimpan:

- judul materi
- pengertian
- huruf
- ayat
- cara baca
- URL audio

Kode yang ditambah adalah:

```ts
import { getMateriAudioUrl } from "@/lib/quranAudio";

const getAudio = (surah: number, ayat: number, position: number) =>
  getMateriAudioUrl(surah, ayat, position);
```

Penjelasan:

- `import { getMateriAudioUrl } ...` memanggil helper dari [lib/quranAudio.ts](lib/quranAudio.ts)
- `getAudio` adalah fungsi kecil untuk membangun URL audio secara cepat
- contoh hasilnya adalah `https://cdn.islamic.app/quran/audio-word/1/1/1.mp3`

Lalu di tiap sub materi kita tambahkan:

```ts
cara_baca: "Nun sukun atau tanwin dilebur ke huruf setelahnya sambil didengungkan selama dua harakat.",
audio_url: getAudio(1, 1, 1),
```

Artinya:

- `cara_baca` adalah teks penjelasan cara membaca
- `audio_url` adalah link audio yang diputar saat halaman materi dibuka

Jadi setiap materi punya data sendiri, dan kita tidak perlu menulis logika audio berulang-ulang di UI.

---

## 2. File helper untuk URL audio

File utama: [lib/quranAudio.ts](lib/quranAudio.ts)

Kode yang ditambah:

```ts
export function getWordAudioUrl(surah: number, ayat: number, position: number) {
  return `https://cdn.islamic.app/quran/audio-word/${surah}/${ayat}/${position}.mp3`;
}

export function getMateriAudioUrl(surah: number, ayat: number, position = 1) {
  return getWordAudioUrl(surah, ayat, position);
}
```

Penjelasan logika:

- `surah` adalah nomor surat
- `ayat` adalah nomor ayat
- `position` adalah posisi kata tertentu
- ini membangun URL seperti:

```txt
https://cdn.islamic.app/quran/audio-word/1/1/1.mp3
```

Fungsi ini penting karena:

- data materi tetap singkat
- audio bisa dihasilkan otomatis
- tambah materi baru cukup masukkan surah, ayat, dan position
- tetap gratis karena pakai CDN publik

---

## 3. File komponen materi

File utama: [components/Materi/LearnMateri.tsx](components/Materi/LearnMateri.tsx)

Kode penting yang ditambah adalah:

```tsx
interface LearnMateriProps {
  materiAktif: {
    id: number;
    judul: string;
    pengertian: string;
    huruf: string[];
    ayat: string;
    cara_baca?: string;
    caraBaca?: string;
    audio_url?: string | null;
    audioUrl?: string | null;
  };
}
```

Penjelasan:

- properti baru `audio_url` dan `audioUrl` dibuat supaya data lama dan data baru tetap kompatibel
- properti `cara_baca` dan `caraBaca` juga dibuat agar tidak error jika nama field berbeda

Lalu logika utama:

```tsx
const audioUrl = materiAktif.audio_url ?? materiAktif.audioUrl ?? null;
const caraBaca = materiAktif.cara_baca ?? materiAktif.caraBaca ?? "";
```

Artinya:

- ambil `audio_url` kalau ada
- kalau tidak ada, coba `audioUrl`
- kalau tidak ada keduanya, anggap `null`

Untuk cara baca juga sama:

- ambil `cara_baca` dulu
- kalau tidak ada, pakai `caraBaca`
- kalau tidak ada, kosongkan

Ini penting supaya kode tidak crash ketika data lama masih memakai nama field yang lama.

---

## 4. Logika tampil audio di UI

Di file [components/Materi/LearnMateri.tsx](components/Materi/LearnMateri.tsx), blok pentingnya adalah:

```tsx
{
  audioUrl && (
    <audio controls className="w-full mt-4">
      <source src={audioUrl} type="audio/mpeg" />
      Browser kamu tidak mendukung pemutar audio.
    </audio>
  );
}
```

Penjelasan logika:

- `audioUrl &&` artinya: jalankan blok hanya jika URL audio ada
- `<audio controls>` membuat player audio bawaan browser
- `source src={audioUrl}` memasukkan URL audio ke player
- `type="audio/mpeg"` menandakan format audio MP3
- `className="w-full mt-4"` membuat lebar full dan jarak atas

Jadi UI hanya menampilkan pemutar kalau data audio memang tersedia, dan kalau tidak ada file audio, komponen tersebut tidak muncul.

---

## 5. CSS / Tailwind yang dipakai

Yang kita gunakan di [components/Materi/LearnMateri.tsx](components/Materi/LearnMateri.tsx) bukan CSS custom, tapi class Tailwind.

Contoh:

```tsx
<div className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-h-[600px] overflow-y-auto">
```

Penjelasan:

- `bg-white` = background putih
- `rounded-xl` = sudut membulat
- `shadow-lg` = bayangan
- `p-6` = padding
- `space-y-6` = jarak antar elemen vertikal
- `max-h-[600px]` = tinggi maksimal 600px
- `overflow-y-auto` = scroll jika konten panjang

Lalu untuk kotak ayat:

```tsx
<div className="bg-slate-100 rounded-xl p-6">
```

- `bg-slate-100` = background abu muda
- `rounded-xl` = sudut membulat
- `p-6` = padding

Lalu untuk teks ayat:

```tsx
<p className="text-5xl text-right">{materiAktif.ayat}</p>
```

- `text-5xl` = ukuran font besar
- `text-right` = rata kanan

Semua ini adalah class Tailwind, bukan file CSS terpisah. Artinya gampang diubah tanpa bikin file CSS baru.

---

## 6. Cara menambahkan audio sendiri nanti

Kalau kamu nanti mau tambah audio sendiri, langkahnya sangat simpel.

### Opsi A: pakai URL CDN gratis

Di file [constant/constMateri.ts](constant/constMateri.ts), tinggal tambahkan:

```ts
audio_url: "https://cdn.islamic.app/quran/audio-word/1/1/1.mp3",
```

atau pakai helper:

```ts
audio_url: getAudio(1, 1, 1),
```

### Opsi B: pakai file yang kamu upload sendiri

Kalau mau pakai file lokal, letakkan di folder public seperti:

```txt
public/audio/contoh.mp3
```

Lalu di data materi:

```ts
audio_url: "/audio/contoh.mp3",
```

Cara ini cocok kalau kamu mau audio khusus hasil rekaman sendiri.

### Opsi C: pakai file hasil rekaman custom

Sama seperti opsi B, tapi tinggal ganti nama file:

```ts
audio_url: "/audio/idgham-bighunnah.mp3",
```

Jadi untuk menambahkan audio sendiri nanti, kuncinya hanya satu: isi `audio_url` dengan URL youtube? no. Gunakan URL valid ke file mp3.

---

## 7. Kesimpulan

Yang kita tambah sebenarnya bukan hanya satu baris. Ada 3 bagian utama:

1. Data materi menampung URL audio
2. Helper URL audio untuk dibuat otomatis
3. UI memeriksa apakah ada audio dan menampilkannya

Jadi, saat kamu menambah materi baru nanti, yang perlu kamu lakukan cukup:

- buka [constant/constMateri.ts](constant/constMateri.ts)
- tambahkan `audio_url` untuk sub materi baru
- biarkan komponen [components/Materi/LearnMateri.tsx](components/Materi/LearnMateri.tsx) yang menangani tampilannya

Dengan pola ini, app kamu lebih mudah dikembangkan, jumlah materi bisa bertambah tanpa mengubah UI lagi.

---

## Ringkasan cepat

- [constant/constMateri.ts](constant/constMateri.ts): tempat data + URL audio
- [lib/quranAudio.ts](lib/quranAudio.ts): helper pembuat URL
- [components/Materi/LearnMateri.tsx](components/Materi/LearnMateri.tsx): menampilkan audio di halaman
- Class seperti `bg-white`, `rounded-xl`, `shadow-lg` adalah Tailwind CSS, bukan CSS custom
- Kalau nanti mau tambah audio sendiri, tinggal isi `audio_url` dengan link mp3 atau path public
