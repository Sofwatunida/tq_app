"use client";

import { useState } from "react";
import { daftarMateri } from "@/constant/constMateri";

import PilihMateri from "pilihMateri";
import ListMateri from "listMateri";
import LearnMateri from "learnMateri";
import FahamMateri from "fahamMateri";

export default function MateriPage() {

const [materi, setMateri] = useState(daftarMateri);
  const [materiIndex, setMateriIndex] = useState(0);
  const [subMateriIndex, setSubMateriIndex] = useState(0);
  
  
  const materiAktif = materi[materiIndex];

  const subMateriAktif =
    materiAktif?.subMateri[subMateriIndex];
  
  const semuaSelesai = materi.every(
    (m) => m.status === "Dipahami"
  );
  
  
  const handlePilihMateri = (index: number) => {
    if (materi[index].status === "Terkunci") return;

    setMateriIndex(index);

    setSubMateriIndex(0);
  };


const handleFaham = () => {
  setMateri((prev) => {
    const data = structuredClone(prev);
    const sub = data[materiIndex].subMateri;

    sub[subMateriIndex].selesai = true;

    // kalo masih ada sub berukutnya

    if (subMateriIndex < sub.length - 1) {
      setSubMateriIndex(subMateriIndex + 1);

      return data;
    }

    // semua sub materi selesai
    data[materiIndex].status = "Dipahami";

    // buka materi berikutnya
    if (materiIndex + 1 < data.length) {
      data[materiIndex + 1].status = "Pelajari";

      setMateriIndex(materiIndex + 1);

      setSubMateriIndex(0);
    }

    return data;
  });
};

  return (
    <main className="min-h-screen bg-gray-100 pt-28 pb-20">
      <div className="w-[90%] mx-auto flex gap-6">
        {/* Kolom kiri */}
        <div className="w-1/3 space-y-6">
          <PilihMateri
            materi={materi}
            handlePilihMateri={handlePilihMateri}
            materiIndex={materiIndex}
          />
          <ListMateri materiAktif={materiAktif} />
        </div>

        {/* Kolom kanan */}
        <div className="w-2/3 space-y-6">
          <LearnMateri
            materiAktif={subMateriAktif} />
          <FahamMateri
            handleFaham={handleFaham}
            semuaSelesai={semuaSelesai}
          />
        </div>
      </div>
    </main>
  );
}