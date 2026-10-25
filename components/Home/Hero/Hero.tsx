import React from 'react';


const Hero = () => {
    return (
      <div
        className=" bg-blue-50 relative w-full min-h-screen items-center flex justify-center 
    flex-col px-4 sm:px-6"
      >
        <div className="relative w-full max-w-4xl mx-auto">
          {/* heading text */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-3xl leading-tight xs:text-4xl sm:text-5xl md:text-6xl lg:leading-[1.2] font-bold text-center text-gray-800 break-words"
          >
            Belajar Tajwid Jadi <br />
            <span className="text-blue-500">Lebih Mudah!</span>
          </h1>

        </div>
      </div>
    );
};

export default Hero;