import React from "react";

type Props = {
  handleFaham: () => void;
  semuaSelesai: boolean;
};

const FahamMateri = ({ handleFaham, semuaSelesai }: Props) => {
  if (semuaSelesai) {
    return (
      <div className="bg-blue-500 w-full min-h-[150px] p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="max-w-full">
          <h3 className="font-bold text-2xl sm:text-3xl text-white">
            Materi Selesai!
          </h3>

          <p className="text-base sm:text-lg text-white mt-2">
            Saatnya uji pemahamanmu dengan kuis!
          </p>

          <p className="text-white mt-1">Daftarkan akun untuk memulainya!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-300 w-full min-h-[150px] p-5 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="max-w-full">
        <h3 className="font-bold text-3xl">
          Sudah memahami sub materi ini?
        </h3>

        <p className="text-xl text-gray-700 mt-2">
          Klik paham jika Anda benar-benar sudah memahaminya!
        </p>
      </div>

  <div className="w-full text-center sm:w-auto sm:text-left">
  <button
    onClick={handleFaham}
    className=" px-6 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition cursor-pointer"
  >
    Paham
  </button>
</div>
    </div>
  );
};

export default FahamMateri;
