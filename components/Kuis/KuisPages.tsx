"use client";
import { dummyKuis } from "@/constant/dummyKuis";
import React from "react";

const KuisPages = () => {
  const soal = dummyKuis[0];
  return (
    <div>
      <div className="bg-white m-20 p-12 shadow-md rounded-lg ">
        <h2 className="flex justify-end">⏱️20</h2>
        <h1 className="font-bold">Soal 1 dari 10</h1>

        <div className="border text-2xl rounded-xl text-center p-8 m-3">
          {soal.ayat}
        </div>

        <p>{soal.soal}</p>

        {soal.pilihan.map((opsi) => (
          <div
            key={opsi}
            className="bg-blue-500 text-white text-center p-3 m-2 rounded-lg"
          >
            {opsi}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KuisPages;
