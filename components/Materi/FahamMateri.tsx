import React from "react";

type Props = {
  handleFaham: () => void;
};

const FahamMateri = ({handleFaham}: Props) => {
  return (
    <div className="bg-green-300 w-full h-[150px] p-5 rounded-2xl shadow-lg flex items-center justify-between">
      <div>
        <h3 className="font-bold text-2xl">Sudah memahami materi ini?</h3>

        <p className="text-lg text-gray-600">
          Klik Faham jika anda benar-benar sudah memahaminya!
        </p>
      </div>

      <button
        onClick={handleFaham}
        className="px-8 py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-600 transition-all duration-200 cursor-pointer">
        Faham
      </button>
    </div>
  );
};

export default FahamMateri;
