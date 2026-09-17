import React from "react";
import { daftarMateri } from "@/constant/constMateri";

type SubMateri = (typeof daftarMateri)[number]["subMateri"][number];

type Props = {
  handleFaham: () => void;
  handleLanjutSubMateri: () => void;
  handleLanjutMateri: () => void; // BARU - untuk pindah ke materi berikutnya
  subMateriAktif: SubMateri | undefined;
  // Props BARU untuk logic conditional
  subMateriIndex: number; // index sub-materi saat ini (0, 1, 2, ...)
  materiIndex: number; // index materi saat ini (0, 1, 2, ...)
  totalSubMateri: number; // total jumlah sub-materi di materi saat ini
  totalMateri: number; // total jumlah materi
};

const FahamMateri = ({
  handleFaham,
  handleLanjutSubMateri,
  handleLanjutMateri,
  subMateriAktif,
  subMateriIndex,
  materiIndex,
  totalSubMateri,
  totalMateri,
}: Props) => {
  // Apakah sub-materi sudah selesai dipelajari?
  if (subMateriAktif?.selesai) {
    // LOGIC: Tentukan tombol mana yang ditampilkan
    // Apakah masih ada sub-materi berikutnya? (bandingkan index saat ini dengan total)
    const adaSubMateriBerikutnya = subMateriIndex < totalSubMateri - 1;

    // Apakah ada materi berikutnya? (jika sub-materi sudah habis)
    const adaMateriBerikatnya = materiIndex < totalMateri - 1;

    return (
      <div className="bg-yellow-300 w-full min-h-[150px] p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="max-w-full">
          <h3 className="font-bold text-3xl">
            Materi ini sudah selesai dipelajari!
          </h3>

          {/* <p className="text-xl text-gray-700 mt-2">
            Lanjutkan ke sub materi berikutnya?
          </p> */}
        </div>

        <div className="w-full text-center sm:w-auto sm:text-left">
          {/* TOMBOL OPTION 1: Jika masih ada sub-materi berikutnya */}
          {adaSubMateriBerikutnya ? (
            <button
              onClick={handleLanjutSubMateri}
              className="px-6 py-3 rounded-lg font-bold text-white bg-yellow-600 hover:bg-yellow-700 transition cursor-pointer"
            >
              Sub Materi Berikutnya →
            </button>
          ) : adaMateriBerikatnya ? (
            // TOMBOL OPTION 2: Sub-materi habis, tapi ada materi berikutnya
            <button
              onClick={handleLanjutMateri}
              className="px-6 py-3 rounded-lg font-bold text-white bg-yellow-600 hover:bg-yellow-700 transition cursor-pointer"
            >
              Materi Selanjutnya →
            </button>
          ) : null}
          {/* TOMBOL OPTION 3: Tidak ada sub & materi berikutnya = Ditangani oleh semuaSelesai */}
        </div>
      </div>
    );
  }

  // CEK 3: Sub-materi BELUM selesai - tampilkan tombol "Paham"
  return (
    <div className="bg-green-300 w-full min-h-[150px] p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="max-w-full">
        <h3 className="font-bold text-3xl">Sudah Memahami Materi Ini?</h3>

        <p className="text-xl text-gray-700 mt-2">
          Klik paham jika Anda benar-benar sudah memahaminya!
        </p>
      </div>

      <div className="w-full text-center sm:w-auto sm:text-left">
        <button
          onClick={handleFaham}
          className="px-6 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition cursor-pointer"
        >
          Paham
        </button>
      </div>
    </div>
  );
};

export default FahamMateri;
