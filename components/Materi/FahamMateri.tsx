import React from "react";

type Props = {
  handleFaham: () => void;
  semuaSelesai: boolean;
};

const FahamMateri = ({
  handleFaham,
  semuaSelesai,
}: Props) => { 
  if (semuaSelesai) {
    return (
      <div className="bg-blue-500 w-full h-[150px] p-5 rounded-2xl shadow-lg flex items-center justify-between">
      <div>
     <h3 className="font-bold text-white text-3xl">
        Materi Selesai!!!!!
      </h3>

      <p className="text-lg text-white  mt-2">
          Saatnya uji pemahamanmu dengan kuis!
      </p>

      <p className="text-white">Daftarkan akun untuk memulainya!</p>
      </div >
        
        {/* <button className="px-8 py-3 rounded-lg font-bold text-white bg-blue-300 hover:bg-blue-700 transition">
          Daftar
        </button> */}
      </div>
    );
  }

  return (
    <div className="bg-green-300 w-full h-[150px] p-5 rounded-2xl shadow-lg flex items-center justify-between">
      <div>
        <h3 className="font-bold text-2xl">
          Sudah memahami sub materi ini?
        </h3>

        <p className="text-lg text-gray-700 mt-2">
          Klik paham jika Anda benar-benar sudah memahaminya!
        </p>
      </div>

      <button
        onClick={handleFaham}
        className="px-8 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition cursor-pointer"
      >
        Paham
      </button>
    </div>
  );
};

export default FahamMateri;