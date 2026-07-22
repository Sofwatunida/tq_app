import Image from 'next/image';
import React from 'react';

const KuisLanding = () => {
  return (
    <div className=" py-16 bg-blue-50 ">
      <div className="w-[80%] sm:mt-18 mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        {/* header kiri */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold sm:w-4/5">
            Saatnya Buktikan Kemampuanmu!
          </h1>
          {/* sub heading/isinya */}
          <p className="text-gray-600 text-lg mt-2 sm:w-4/5">
            Jawab setiap soal, kumpulkan poin, dan jadikan setiap kuis sebagai
            langkah menuju hasil yang lebih baik!
          </p>
          {/* cta buttttttttton */}
          <button className="mt-3 px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer hover:bg-cyan-600 transition-all duration-200 bg-blue-500 text-white">
            Mulai
          </button>
        </div>

        {/* kolom kanan */}
        <div
          className="mt-7 justify-self-end"
          data-aos="zoom-in"
          data-aos-anchor-placement="top-center"
        >
          <Image
            src={"/images/quran.png"}
            alt="img"
            width={250}
            height={2500}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default KuisLanding;