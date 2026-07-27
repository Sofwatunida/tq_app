"use client";

import { useState } from "react";
import { daftarMateri } from "@/constant/constMateri";

import PilihMateri from "pilihMateri";
import ListMateri from "listMateri";
import LearnMateri from "learnMateri";
import FahamMateri from "fahamMateri";

export default function MateriPage() {

const [materi, setMateri] = useState(daftarMateri);

  const materiAktif = materi.find(
    (m) => m.status === "Pelajari");

const handleFaham = () => {
  setMateri((prev) => {
    const data = prev.map((item) => ({...item}));

    const index = data.findIndex(
      (m) => m.status === "Pelajari");

    if (index === -1) return data;

    data[index].status = "Selesai";

    if (index + 1 < data.length) {
      data[index + 1].status = "Pelajari";
    }

    return data;
  });
};

  return (
    <main className="min-h-screen bg-gray-100 pt-28 pb-20">
      <div className="w-[90%] mx-auto flex gap-6">
        {/* Kolom kiri */}
        <div className="w-1/3 space-y-6">
          <PilihMateri materi={materi} />
          <ListMateri materi={materi} />
        </div>

        {/* Kolom kanan */}
        <div className="w-2/3 space-y-6">
          <LearnMateri materiAktif={materiAktif} />
          <FahamMateri handleFaham={handleFaham} />
        </div>
      </div>
    </main>
  );
}