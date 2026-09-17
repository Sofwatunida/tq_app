import React from "react";

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

export default function LearnMateri({ materiAktif }: LearnMateriProps) {
  const audioUrl = materiAktif.audio_url ?? materiAktif.audioUrl ?? null;
  const caraBaca = materiAktif.cara_baca ?? materiAktif.caraBaca ?? "";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-h-[600px] overflow-y-auto">
      <h2 className="text-3xl font-bold text-blue-700">{materiAktif.judul}</h2>

      <div>
        <h3 className="font-semibold text-lg">Pengertian</h3>
        <p className="text-gray-700">{materiAktif.pengertian}</p>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Huruf</h3>
        <div className="flex gap-3 flex-wrap">
          {materiAktif.huruf.map((huruf: string) => (
            <div
              key={huruf}
              className="w-14 h-14 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-3xl font-bold"
            >
              {huruf}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-100 rounded-xl p-6">
        <p className="text-5xl text-right">{materiAktif.ayat}</p>

        {audioUrl && (
          <audio controls className="w-full mt-4">
            <source src={audioUrl} type="audio/mpeg" />
            Browser kamu tidak mendukung pemutar audio.
          </audio>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-lg">Cara Membaca</h3>
        <p className="text-gray-700">{caraBaca}</p>
      </div>
    </div>
  );
}
