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
        <div className="mt-5 p-4">
          <div className="flex items-center justify-center">
            <Image
              src={"/images/perak.png"}
              alt="img"
              width={250}
              height={250} />
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
