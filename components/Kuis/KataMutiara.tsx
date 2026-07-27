import Image from 'next/image'
import React from 'react'

const KataMutiara = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md">
      <h1 className="font-bold text-4xl pb-3">Kata-kata mutiara</h1>
      <div className="bg-blue-500 p-5 shadow-xl rounded-lg">
        <p className="text-white  text-xl">
          “Sebaik-baik kalian adalah yang belajar Al-Quran dan Mengajarkannya”
          -HR. Bukhari
        </p>
      </div>
      <div className="pt-5">
        <Image src={"/images/ngajiboys.png"} alt="img" width={300} height={300} className="shadow-xl rounded-lg" />
      </div>
    </div>
  );
}

export default KataMutiara