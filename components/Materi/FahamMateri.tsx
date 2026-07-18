import React from "react";

const FahamMateri = () => {
  return (
    <div className="bg-green-100 rounded-2xl p-6 shadow-lg flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-lg">Sudah memahami materi ini?</h3>

        <p className="text-sm text-gray-600">
          Klik paham jika anda sudah memahaminya!
        </p>
      </div>

      <button className="px-8 py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-200 cursor-pointer">
        Paham
      </button>
    </div>
  );
};

export default FahamMateri;
