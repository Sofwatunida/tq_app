import React from 'react';
import Image from 'next/image';

const Hero = () => {
    return (
      <div
        className="relative w-full h-[145vh] md:h-[120vh] lg:h-[160vh] items-center flex justify-center 
    flex-col"
      >
        <div className="relative">
          {/* heading text */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-800">
            Belajar Tajwid Jadi{" "}
            <span className="text-cyan-600">Lebih Mudah</span>
          </h1>
          {/* isinya */}
          <p className="mt-3 text-base sm:text-lg lg:text-xl leading-8 text-center">
            Belajar, uji pemahaman, dan bersing dengan teman- teman untuk
            menjadi yang terbaik.
          </p>
          {/* image */}
          <div className="mt-7">
            <Image
              src={"/images/quran.png"}
              alt="img"
              width={300}
              height={300} />
          </div> 
        </div>
      </div>
    );
};

export default Hero;