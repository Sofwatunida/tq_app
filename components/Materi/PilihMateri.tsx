import React from "react";
import { daftarMateri } from "@/constant/constMateri";

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Dipahami":
      return {
        card: "bg-green-50 border-2 border-green-500",
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
  }
};

type Props = {
  materi: typeof daftarMateri;
  materiIndex: number;
  handlePilihMateri: (index: number) => void;
};

const PilihMateri = ({ materi, handlePilihMateri }: Props) => {
  return (
    <div className="bg-white w-full min-h-[300px] md:min-h-[420px] lg:min-h-[600px] rounded-2xl shadow-lg overflow-hidden">
      {/* header */}
      <div className="text-white bg-blue-500 p-4 sm:p-5">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Materi Dasar Tajwid
        </h2>
      </div>

      {/* isi */}
      <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 font-bold">
        {materi.map((item, index) => {
          const style = getStatusStyle(item.status);

          return (
            <div
              key={item.id}
              onClick={() => handlePilihMateri(index)}
              className={`flex items-center justify-between gap-2 sm:gap-3 rounded-xl p-3 sm:p-4 ${style.card} ${
                item.status !== "Terkunci"
                  ? "cursor-pointer hover:scale-[1.01] sm:hover:scale-[1.02] transition"
                  : "cursor-not-allowed opacity-70"
              }`}
            >
              <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-3">
                <span className="text-base sm:text-lg md:text-xl font-bold flex-shrink-0">
                  {item.id}
                </span>
                <span className="break-words text-sm sm:text-base md:text-lg">
                  {item.judul}
                </span>
              </div>

              <span
                className={`shrink-0 w-20 sm:w-24 md:w-32 text-center font-bold rounded-full py-1 sm:py-2 text-xs sm:text-sm  ${style.badge}`}
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
