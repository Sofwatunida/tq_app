import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
      <div className="py-24 bg-blue-300">
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          {/* image */}
          <div>
            <Image
              src={"/images/quran.png"}
              alt="about"
              width={300}
              height={300}
            />
          </div>
          {/* isinya */}
          <div>
            {/* heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Kuasai Tajwid, Mulai Dari Sini!
            </h1>
            {/* isinya */}
            <p className="text-gray-600 text-lg mt-2 sm:w-4/5">
              Pelajari dasar hukum tajwid dengan materi yang ringkas dan mudah
              dipahami.
              Siapkan dirimu sebelum menaklukkan kuis!
            </p>
            {/* cta buttttttttton */}
            <button className="mt-3 px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer hover:bg-cyan-600 transition-all duration-200 bg-blue-500 text-white">
              Pelajari
            </button>
          </div>
        </div>
      </div>
    );
          };

export default About;  