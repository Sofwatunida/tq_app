import Image from 'next/image'
import React from 'react'

const KataMutiara = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md overflow-hidden">
      <h1 className="font-bold text-4xl md:text-4xl pb-3">Kata-kata mutiara</h1>
      <div className="w-full bg-blue-500 p-5 shadow-xl rounded-lg">
        <p className="text-white text-xl md:text-xl break-words">
          “Sebaik-baik kalian adalah yang belajar Al-Quran dan Mengajarkannya”
          <br />
          <p className="font-bold">-HR. Bukhari</p>
        </p>
      </div>
      <div className="pt-5">
        <Image
          src={"/images/ngajiboys.png"}
          alt="img"
          width={300}
          height={300}
          className="w-full max-w- h-auto "
        />
      </div>
    </div>
  );
}

export default KataMutiara