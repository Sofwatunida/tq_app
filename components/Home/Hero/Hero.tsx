import React from 'react';


const Hero = () => {
    return (
      <div
        className=" bg-blue-50 relative w-full min-h-screen  items-center flex justify-center 
    flex-col"
      >
        <div className="relative">
          {/* heading text */}
          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl  leading-tight sm:text-5xl md:text-6xl lg:leading-[1.2] font-bold text-center text-gray-800"
          >
            Belajar Tajwid Jadi <br />
            <span className="text-blue-500">Lebih Mudah!</span>
          </h1>

        </div>
      </div>
    );
};

export default Hero;