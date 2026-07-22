import React from "react";
import { daftarMateri } from "@/constant/constMateri";


const getStatusStyle = (status: string) => {
  switch (status) {
    case "Selesai":
      return {
        card: "bg-green-50 border border-green-300 ",
        badge: "bg-green-500 text-white",
      };
    
    case "Pelajari":
      return {
        card: "bg-blue-50 border border-blue-500",
        badge: "bg-blue-500 text-white",
      };
    
    default:
      return {
        card: "bg-gray-100 border border-gray-500",
        badge: "bg-gray-500 text-white",
      };
  };
};

const PilihMateri = () => {
  return (
    // header
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* header */}
      <div className="text-white bg-blue-500 p-5">
        <h2 className="text-xl">Materi Dasar Tajwid</h2>
      </div>

      {/* isi */}
      <div className="p-5 space-y-3">
        {daftarMateri.map((materi) => {
          const style = getStatusStyle(materi.status);


          return (
            <div
              key={materi.no}
              className={`flex flex-wrap items-center justify-between rounded-xl p-4 ${style.card}`}
            >
              <div className="flex items-center gap-4">
                <span>{materi.no}</span>
                <span>{materi.nama}</span>
              </div>

              <span className={`rounded-full px-3 py-1 text-sm font-medium ${style.badge}`}
              >
                {materi.status}
                </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PilihMateri;
