import type { HighlightUi } from "./typesMateriTajwid";

/**
 * Satu bagian ayat setelah dipotong berdasarkan titik highlight.
 *
 * - `biasa`    : teks biasa, tanpa penekanan.
 * - `highlight`: bagian yang ditonjolkan.
 */
export type BagianAyat =
  | { jenis: "biasa"; teks: string }
  | {
      jenis: "highlight";
      teks: string;
      label: string;
      audioUrl: string | null;
      catatan: string | null;
    };

/**
 * Buang highlight yang tidak masuk akal.
 *
 * Ini penting karena indeks highlight dihitung manual dari teks ayat.
 * Kalau teks ayat berubah, indeksnya bisa keluar range atau saling tumpang tindih,
 * dan itu tidak boleh membuat aplikasi crash.
 */
export function bersihkanHighlight(
  panjangTeks: number,
  highlight: HighlightUi[],
): HighlightUi[] {
  const valid = highlight.filter(
    (h) =>
      Number.isInteger(h.startIndex) &&
      Number.isInteger(h.endIndex) &&
      h.startIndex >= 0 &&
      h.endIndex > h.startIndex &&
      h.endIndex <= panjangTeks,
  );

  const urut = [...valid].sort((a, b) => a.startIndex - b.startIndex);

  // Buang highlight yang menimpa highlight sebelumnya.
  const hasil: HighlightUi[] = [];
  let batasSebelumnya = 0;

  for (const h of urut) {
    if (h.startIndex < batasSebelumnya) continue;
    hasil.push(h);
    batasSebelumnya = h.endIndex;
  }

  return hasil;
}

/**
 * Potong ayat utuh menjadi bagian-bagian biasa dan bagian yang di-highlight.
 *
 * Contoh untuk ayat "مِنْ شَرِّ" dengan highlight [2, 7) berlabel "Ikhfa":
 *   [ { biasa: "مِنْ " }, { highlight: "شَرِّ", label: "Ikhfa" } ]
 */
export function bagiAyat(
  teks: string,
  highlight: HighlightUi[],
): BagianAyat[] {
  if (!teks) return [];

  const valid = bersihkanHighlight(teks.length, highlight);

  if (valid.length === 0) return [{ jenis: "biasa", teks }];

  const bagian: BagianAyat[] = [];
  let kursor = 0;

  for (const h of valid) {
    if (h.startIndex > kursor) {
      bagian.push({ jenis: "biasa", teks: teks.slice(kursor, h.startIndex) });
    }

    bagian.push({
      jenis: "highlight",
      teks: teks.slice(h.startIndex, h.endIndex),
      label: h.label,
      audioUrl: h.audioUrl,
      catatan: h.catatan,
    });

    kursor = h.endIndex;
  }

  if (kursor < teks.length) {
    bagian.push({ jenis: "biasa", teks: teks.slice(kursor) });
  }

  return bagian;
}

/** Nama hukum yang muncul di ayat, urut dan tanpa duplikat. */
export function kumpulkanLabel(highlight: HighlightUi[]): string[] {
  const label = highlight.map((h) => h.label).filter(Boolean);

  return [...new Set(label)];
}
