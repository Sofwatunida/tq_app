# Penjelasan Angka pada Audio Ayat

## Format URL audio

Kita memakai helper ini:

```ts
getAudio(surah, ayat, position);
```

Artinya:

- `surah` = nomor surat
- `ayat` = nomor ayat
- `position` = posisi kata di dalam ayat

Contoh:

```ts
getAudio(1, 2, 1);
```

Hasil URL-nya:

```txt
https://cdn.islamic.app/quran/audio-word/1/2/1.mp3
```

Jadi angka `(1, 2, 1)` berarti:

- surat ke-1
- ayat ke-2
- kata ke-1

---

## Kenapa angka itu penting?

Karena tiap materi bisa punya bunyi yang berbeda tergantung ayat dan kata yang dipilih.

Kalau semua data memakai angka yang sama seperti:

```ts
audio_url: getAudio(1, 1, 1);
```

maka semua materi akan memutar audio yang sama.

Itu sebabnya suara terdengar sama di semua layar materi.

---

## Contoh lain

```ts
getAudio(2, 1, 2);
```

Artinya:

- surat ke-2
- ayat ke-1
- kata ke-2

URL:

```txt
https://cdn.islamic.app/quran/audio-word/2/1/2.mp3
```

---

## Di file project

Angka-angka ini ada di file:

- [constant/constMateri.ts](constant/constMateri.ts)

Setiap sub materi punya `audio_url` seperti ini:

```ts
audio_url: getAudio(1, 1, 1),
```

Kalau mau ayat berbeda, tinggal ubah angka di belakang fungsi tersebut.

---

## Cara ganti sesuai ayat yang ingin dibaca

Misalnya kamu mau sub materi ini pakai surat 2 ayat 4 posisi 3, maka tulis:

```ts
audio_url: getAudio(2, 4, 3),
```

Artinya:

- surat 2
- ayat 4
- posisi kata ke-3

---

## Ringkasnya

```ts
getAudio(surah, ayat, position);
```

- `surah` = surat
- `ayat` = ayat
- `position` = urutan kata

Semakin sesuai angka dengan ayat yang ingin dibunyikan, semakin sesuai pula suara yang diputar.
