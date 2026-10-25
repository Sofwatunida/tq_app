import React, { useEffect, useRef, useState } from "react";
import AyatTajwid from "@/components/Materi/AyatTajwid";
import type { HighlightUi } from "@/lib/typesMateriTajwid";

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
    audio_urls?: string[];
    ayatPenuh?: string;
    highlight?: HighlightUi[];
    ref?: string;
  };
}

export default function LearnMateri({ materiAktif }: LearnMateriProps) {
  const audioUrl = materiAktif.audio_url ?? materiAktif.audioUrl ?? null;
  const audioUrls = materiAktif.audio_urls?.length
    ? materiAktif.audio_urls
    : audioUrl
      ? [audioUrl]
      : [];
  const caraBaca = materiAktif.cara_baca ?? materiAktif.caraBaca ?? "";

  // Data lama tidak punya ayat utuh, jadi pakai `ayat` yang berisi cuplikan.
  const ayatPenuh = materiAktif.ayatPenuh ?? materiAktif.ayat;
  const highlight = materiAktif.highlight ?? [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-x-hidden lg:max-h-[600px] lg:overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 break-words">{materiAktif.judul}</h2>

      <div>
        <h3 className="font-semibold text-base sm:text-lg">Pengertian</h3>
        <p className="text-gray-700 break-words">{materiAktif.pengertian}</p>
      </div>

      <div>
        <h3 className="font-semibold text-base sm:text-lg mb-3">Huruf</h3>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {materiAktif.huruf.map((huruf: string) => (
            <div
              key={huruf}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold flex-shrink-0"
            >
              {huruf}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-100 rounded-xl p-4 sm:p-6 overflow-x-hidden">
        <AyatTajwid
          ayat={ayatPenuh}
          highlight={highlight}
          ref={materiAktif.ref}
        />

        {audioUrls.length > 0 && (
          <UrutanAudio
            key={audioUrls.join("|")}
            urls={audioUrls}
            className="w-full mt-4"
          />
        )}
      </div>

      <div>
        <h3 className="font-semibold text-base sm:text-lg">Cara Membaca</h3>
        <p className="text-gray-700 break-words">{caraBaca}</p>
      </div>
    </div>
  );
}

function UrutanAudio({
  urls,
  className,
}: {
  urls: string[];
  className: string;
}) {
  const [index, setIndex] = useState(0);
  const [lanjutkan, setLanjutkan] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!lanjutkan) return;

    setLanjutkan(false);
    void audioRef.current?.play().catch((error: unknown) => {
      console.error("Gagal melanjutkan audio materi:", error);
    });
  }, [index, lanjutkan]);

  return (
    <audio
      ref={audioRef}
      controls
      src={urls[index]}
      className={className}
      onEnded={() => {
        if (index < urls.length - 1) {
          setIndex(index + 1);
          setLanjutkan(true);
        } else {
          setIndex(0);
        }
      }}
    >
      Browser kamu tidak mendukung pemutar audio.
    </audio>
  );
}
