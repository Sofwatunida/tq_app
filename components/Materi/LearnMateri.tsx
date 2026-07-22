import React from "react";

const LearnMateri = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-white p-5">
          <h1 className="text-2xl font-bold mb-3">Idzhar Halqi</h1>
          <p>
            Idzhar Halqi terjadi Saat kalian liat nun mati atau tanwin ketemu
            sama huruf yang 6 di bawah ini
          </p>
          <div className="bg-blue-300 border p-5 rounded-2xl flex justify-center items-center mt-2 ">
            ء هـ ع ح غ خ
          </div>
          <p className="m-3 font-medium">Contoh</p>
          <div className=" flex justify-center gap-5 pt-2">
            <div className="bg-white border border-black rounded p-5">
              نَارٌ حَامِيَةٌ
            </div>
            <div className="bg-white border border-black rounded p-5">
              مِنْ عَلَقٍ
            </div>
          </div>
          <p className="mt-3">
            simplenya ketika kamu baca hukum idzhar bunyi mulut harus jelas
            bunyi “<span className="text-red-500">n</span>” nya!
          </p>
          <div className="mt-8 font-medium ">
            Naaru<span className="text-red-500">n</span> Haamiyah <br />
            Mi<span className="text-red-500">n</span> Alaq
          </div>
        </div>
      </div>
    );
};

export default LearnMateri;