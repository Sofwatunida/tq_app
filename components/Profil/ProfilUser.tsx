import Image from 'next/image'
import React from 'react'

const ProfilUser = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 ">
      <div className="bg-white shadow-lg rounded-xl w-[400px] p-8 text-center">
        <div className=" flex justify-center">
          <Image
            src={"/images/ngajiboys.png"}
            alt="img"
            width={120}
            height={120}
            className="rounded-full border border-gray-500"
          />
        </div>

        <h1 className="font-bold text-4xl mt-4">Sofwatunida</h1>
        <p className="text-sm">sofwatunida.arahma@gmail.com</p>
        <div className="bg-blue-600 text-white rounded-lg mt-5 p-4">
          <h2 className="text-2xl">Total Poin</h2>
          <div className="text-2xl flex items-center justify-center gap-2  mt-2">
            <Image
              src={"/images/crown.png"}
              alt="img"
              width={50}
              height={50} />
            <span className="text-4xl">990</span>
          </div>
        </div>
        <button className="bg-red-600 text-white p-3 rounded-lg w-full mt-3">
          Log out
        </button>
      </div>
    </div>
  );
};

export default ProfilUser;
