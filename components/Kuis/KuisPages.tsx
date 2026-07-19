"use client";
import React from "react";

const KuisPages = () => {
  return (
    <div>
      <div className="bg-white m-8 p-5 shadow-md rounded-lg ">
        <h1 className="font-bold">Soal 1 dari 10</h1>
        <p>Perhatikan ayat di bawah ini!</p>

        <div className="border  border-black rounded-sm text-center p-8 m-3">
          نَـارٌ حَـامِيَهٌ
        </div>

        <p>Ayat diatas termasuk hukum bacaan..</p>
        <div className="bg-green-600 text-white text-center p-3 m-2 rounded-lg ">
          Idzhar
        </div>
        <div className="bg-blue-600 text-white text-center p-3 m-2 rounded-lg ">
          Idgom
        </div>
        <div className="bg-orange-600 text-white text-center p-3 m-2 rounded-lg ">
          Ikhfa
        </div>
        <div className="bg-pink-600 text-white text-center p-3 m-2 rounded-lg ">
          iklab
        </div>
      </div>
    </div>
  );
};

export default KuisPages;
