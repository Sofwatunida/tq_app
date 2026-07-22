import React from "react";

const LearnMateri = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">IDZHAR HALQI</h1>

        <p className="text-gray-700 leading-relaxed">
          Idzhar Halqi terjadi saat nun mati atau tanwin bertemu dengan salah
          satu dari 6 huruf berikut:
        </p>

        <div className="bg-blue-500 text-white border-2 border-blue-700 p-5 rounded-2xl flex justify-center items-center mt-4 text-4xl">
          ء هـ ع ح غ خ
        </div>

        <h2 className="mt-6 mb-3 text-2xl font-bold">Contoh</h2>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <div className="bg-green-100 text-green-600 text-4xl md:text-5xl border-2 border-green-500 rounded-xl p-5 text-center">
            نَارٌ حَامِيَةٌ
          </div>

          <div className="bg-[#FFF78D] text-[#d09e0a] text-4xl md:text-5xl border-2 border-yellow-500 rounded-xl p-5 text-center">
            مِنْ عَلَقٍ
          </div>
        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">
          Simpelnya, ketika membaca hukum Idzhar, bunyi
          <span className="text-red-500 font-bold"> "n" </span>
          harus terdengar jelas.
        </p>

        <div className="mt-6 bg-gray-100 rounded-xl p-4 text-lg font-medium">
          Naaru<span className="text-red-500 font-bold">n</span> Haamiyah
          <br />
          Mi<span className="text-red-500 font-bold">n</span> Alaq
        </div>
      </div>
    </div>
  );
};

export default LearnMateri;
