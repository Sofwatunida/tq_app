import React from 'react';


const Hero = () => {
    return (
      <div
        className=" bg-blue-50 relative w-full h-[145vh] md:h-[120vh] lg:h-[160vh] items-center flex justify-center 
    flex-col"
      >
        <div className="relative">
          {/* heading text */}
          <h1 className="text-4xl leading-tight sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center text-gray-800">
            Belajar Tajwid Jadi{" "}
            <span className="text-cyan-600">Lebih Mudah</span>
          </h1>
          {/* isinya */}
          <p className="mt-4 text-base sm:text-3xl lg:text-2xl leading-8 text-center">
            Belajar, uji pemahaman, dan bersing dengan <br /> teman- teman untuk
            menjadi yang terbaik.
          </p>
          {/* image */}
          {/* <div className="mt-7">
            <Image
              src={"/images/quran.png"}
              alt="img"
              width={300}
              height={300} />
          </div>  */}
        </div>
      </div>
    );
};

export default Hero;