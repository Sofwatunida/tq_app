"use client";

import { useState } from "react";
import { dummyUser } from "@/constant/dummyUser";
import { dummyPredikat } from "@/constant/dummyPredikat";

const PredikatLevel = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);

 const getPredikat = (poin: number) => {
  const hasil = dummyPredikat.find(
    (item) =>
      poin >= item.nilaiMin &&
      poin <= item.nilaiMax
  );

   
  return hasil?.predikat ?? "-";
};

// ngurutin per poin yg tertingggi
  const userLevel = dummyUser
    // saring data per level
    .filter((user) => user.level === selectedLevel)
    // mengurtkn data
    .sort((a, b) => {
      if (b.poin !== a.poin) {
        return b.poin - a.poin;
      }
      // terkecil
      return a.waktu - b.waktu;
    });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mt-20 mb-4">
        Predikat Level {selectedLevel}
      </h2>

      {/* tabel */}
      <div className="overflow-hidden rounded-xl border border-blue-200">
        <div className="grid grid-cols-4 bg-blue-100 font-semibold text-center p-3">
          <div>Predikat</div>
          <div>Pengguna</div>
          <div>Waktu</div>
          <div>Poin</div>
        </div>

        {userLevel.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-4 text-center border-t p-3"
          >
            {/* bagian yg nmpilin A/predikat */}
            <div>{getPredikat(user.poin)}</div>
            <div>{user.username}</div>
            <div>{Math.floor(user.waktu / 60)} menit</div>
            <div>{user.poin}</div>
          </div>
        ))}
      </div>

      {/* dropdown */}
      <div className="mt-5 flex justify-end">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(Number(e.target.value))}
          className="border rounded-lg px-4 py-2"
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
          <option value={4}>Level 4</option>
          <option value={5}>Level 5</option>
        </select>
      </div>
    </div>
  );
};

export default PredikatLevel;
