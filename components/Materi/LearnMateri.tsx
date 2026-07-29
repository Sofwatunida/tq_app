import React from "react";

type Props = {
  materiAktif:
    | {
        id: number;
        judul: string;
        isi: string;
        selesai: boolean;
      }
    | undefined;
};

const LearnMateri = ({ materiAktif }: Props) => {
  if (!materiAktif) {
    return (
      <div className="bg-white w-full min-h-[320px] md:min-h-[600px] p-5 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">Belum ada materi yang dipilih</h1>
      </div>
    );
  }

  return (
    <div className="bg-white w-full min-h-[380px] md:min-h-[600px] p-5 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 max-h-[calc(100vh-260px)] overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4">{materiAktif.judul}</h1>

        <p className="text-gray-700 leading-relaxed break-words">
          {materiAktif.isi}
        </p>
      </div>
    </div>
  );
};

export default LearnMateri;
