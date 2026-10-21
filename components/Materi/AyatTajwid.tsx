"use client";

import { useEffect, useRef, useState } from "react";
import { bagiAyat, kumpulkanLabel } from "@/lib/highlightTajwid";
import type { HighlightUi } from "@/lib/typesMateriTajwid";

type AyatTajwidProps = {
  /** Ayat utuh, termasuk bagian yang tidak di-highlight. */
  ayat: string;
  /** Potongan yang ditonjolkan. Indeksnya relatif terhadap `ayat`. */
  highlight: HighlightUi[];
  /** Sumber ayat untuk tooltip, mis. "Al-Ibrahim: 16". */
  ref?: string;
};

/**
 * Menampilkan ayat utuh dengan bagian hukum tajwid yang di-highlight,
 * plus tombol audio kecil untuk memutar kata yang di-highlight saja.
 *
 * Tidak ada autoplay: suara hanya keluar setelah tombol ditekan.
 */
export default function AyatTajwid({ ayat, highlight, ref }: AyatTajwidProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sedangBermain, setSedangBermain] = useState<number | null>(null);

  // Penanda agar pemutaran lama berhenti saat tombol lain ditekan.
  const tokenRef = useRef(0);

  const bagian = bagiAyat(ayat, highlight);
  const label = kumpulkanLabel(highlight);

  useEffect(() => {
    return () => {
      tokenRef.current += 1;
      audioRef.current?.pause();
    };
  }, []);

  /**
   * Satu tombol bisa memuat beberapa file audio sekaligus.
   * Pisahkan tiap URL dengan tanda "|", lalu diputar berurutan.
   *
   * Contoh: "https://.../1.mp3|https://.../2.mp3"
   */
  const putar = async (index: number, url: string | null) => {
    if (!url) return;

    const daftar = url
      .split("|")
      .map((satu) => satu.trim())
      .filter(Boolean);

    if (daftar.length === 0) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const pemutar = audioRef.current;

    // Tekan tombol yang sedang berbunyi = hentikan.
    if (sedangBermain === index) {
      tokenRef.current += 1;
      pemutar.pause();
      pemutar.currentTime = 0;
      setSedangBermain(null);
      return;
    }

    const token = (tokenRef.current += 1);
    setSedangBermain(index);

    for (const satu of daftar) {
      if (tokenRef.current !== token) return;

      pemutar.src = satu;
      pemutar.currentTime = 0;

      const selesai = await new Promise<boolean>((resolve) => {
        pemutar.onended = () => resolve(true);
        pemutar.onerror = () => resolve(false);
        void pemutar.play().catch(() => resolve(false));
      });

      if (!selesai || tokenRef.current !== token) break;
    }

    if (tokenRef.current === token) {
      setSedangBermain(null);
    }
  };

  return (
    <div dir="rtl" className="space-y-4">
      <p
        className="text-5xl text-right leading-loose"
        title={ref && ref.length > 0 ? ref : undefined}
      >
        {bagian.map((item, index) =>
          item.jenis === "biasa" ? (
            <span key={`biasa-${index}`}>{item.teks}</span>
          ) : (
            <span
              key={`highlight-${index}`}
              title={item.catatan ?? item.label}
              className="underline decoration-2 decoration-blue-500 underline-offset-8 bg-blue-50"
            >
              {item.teks}
            </span>
          ),
        )}
      </p>

      {label.length > 0 && (
        <ul className="flex flex-wrap gap-2" dir="ltr">
          {label.map((nama) => (
            <li
              key={nama}
              className="text-xs font-medium text-blue-700 bg-blue-100 rounded-full px-3 py-1"
            >
              {nama}
            </li>
          ))}
        </ul>
      )}

      {highlight.some((h) => Boolean(h.audioUrl)) && (
        <div className="flex flex-wrap gap-2" dir="ltr">
          {highlight.map((item, index) =>
            item.audioUrl ? (
              <button
                key={`audio-${index}`}
                type="button"
                onClick={() => void putar(index, item.audioUrl)}
                className="text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50"
              >
                {sedangBermain === index ? "▮▮ Memutar" : "▷ Dengar"}
              </button>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
