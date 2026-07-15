import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
      <div className="py-24 bg-blue-400">
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
            <p className="mt-3 text-base sm:text-lg lg:text-xl leading-8 text-center">
              Pelajari dasar hukum tajwid dengan materi yang ringkas dan mudah
              dipahami. <br />Siapkan dirimu sebelum menaklukkan kuis!
            </p>
          </div>
        </div>
      </div>
    );
          };

export default About;  