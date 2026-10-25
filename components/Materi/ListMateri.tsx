import React from "react";
import { daftarMateri } from "@/constant/constMateri";

type Props = {
  materiAktif: (typeof daftarMateri)[number] | undefined;
};

const ListMateri = ({ materiAktif }: Props) => {
  if (!materiAktif) {
    return (
      <div className="bg-white shadow-lg rounded-2xl w-full h-[150px] p-5">
        <h2 className="text-2xl font-bold">Daftar Materi</h2>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] overflow-y-auto p-4 sm:p-5">
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-blue-500 mb-3 sticky top-0 bg-white">
        Sub Materi {materiAktif.judul}
      </h2>

      <ol className="list-decimal pl-5 sm:pl-6 space-y-2 text-sm sm:text-base">
        {materiAktif.subMateri.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-3"
          >
            <span className="list-item break-words text-base sm:text-lg font-bold">
              {item.judul}
            </span>
            <span>{item.selesai ? "" : ""}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListMateri;
