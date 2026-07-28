import React from "react";
import { daftarMateri } from "@/constant/constMateri";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Dipahami":
      return {
        card: "bg-green-50 border-2 border-green-500 px-7",
        badge: "px-6 py-3 bg-green-500 text-white font-bold",
      };

    case "Pelajari":
      return {
        card: "bg-blue-50 border-2 border-blue-500",
        badge: "px-6 py-3 bg-blue-500 text-white font-bold",
      };

    default:
      return {
        card: "bg-gray-100 border-2 border-gray-500",
        badge: "px-6 py-3 bg-gray-500 text-white font-bold",
      };
  };
};

type Props = {
  materi: typeof daftarMateri;
  materiIndex: number;
  handlePilihMateri: (index: number) => void;

};

const PilihMateri = ({
  materi,
  handlePilihMateri,
}: Props) => {
   return (

    <div className="bg-white w-full h-[600px]  rounded-2xl shadow-lg overflow-hidden">
      {/* header */}
      <div className="text-white bg-blue-500 p-5">
        <h2 className="text-3xl font-semibold">Materi Dasar Tajwid</h2>
      </div>

      {/* isi */}
      <div className="p-5 space-y-3 text-xl font-bold">
        {materi.map((item, index) => {
          const style = getStatusStyle(item.status);

          return (
            <div
              key={item.id}
              onClick={() => handlePilihMateri(index)}
              className={`flex flex-wrap items-center justify-between rounded-xl p-4 
                ${style.card}
                ${
                item.status !== "Terkunci"
                ? "cursor-pointer hover:scale-[1.02] transition"
                : "cursor-not-allowed opacity-70"
                }
        
                `}
            >
              <div className="flex items-center gap-4">
                <span>{item.id}</span>
                <span>{item.judul}</span>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${style.badge}`}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PilihMateri;
