import React from "react";
import { daftarMateri } from "@/constant/constMateri"

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
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-full h-[150px] p-5">
      <h2 className="font-bold text-2xl mb-3">
        Sub Materi {materiAktif.judul}
      </h2>

      <ol className="list-decimal pl-6 space-y-2">
        {materiAktif.subMateri.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.judul}</span>

            <span>{item.selesai ? "✅" : ""}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ListMateri;
