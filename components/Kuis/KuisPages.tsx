"use client";
import { useParams } from "next/navigation";
import { dummyKuis } from "@/constant/dummyKuis";
import { useEffect, useState } from "react";

// import { useRouter } from "next/router";
  


const KuisPages = () => {
  
  const params = useParams();
  const level = params.level as string;
    
  const [timer, setTimer] = useState(10);
  const [nomorSoal, setNomorSoal] = useState(0);
  const [jawabanDipilih, setJawabanDipilih] = useState("");
  const [poin, setPoin] = useState(0);
  const [totalWaktu, setTotalWaktu] = useState(0);
  const [selesai, setSelesai] = useState(false);
  

  const soalLevel = dummyKuis.filter(
  (item) => item.level === Number(level)
  );


  const soal = soalLevel[nomorSoal];
  
  useEffect(() => {

    if (selesai) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    setTotalWaktu((prev) => prev + 1);
  }, 1000);

    
  return () => clearInterval(interval);
}, [selesai]);


// lanjut soal
  useEffect(() => {
  if (jawabanDipilih) return;

  if (timer === 0) {
    if (nomorSoal < soalLevel.length - 1) {
      setNomorSoal((prev) => prev + 1);
      setTimer(10);
      setJawabanDipilih("");
    } else {
      setSelesai(true);
    }   
  }
  }, [timer, nomorSoal, jawabanDipilih, soalLevel.length]);
  // Jadi kalau sudah memilih jawaban, timer tidak ikut memindahkan soal.

const lanjutSoal = () => {
  if (nomorSoal < soalLevel.length - 1)
  {
    setNomorSoal((prev) => prev  + 1);
    setTimer(10);
    setJawabanDipilih("");
  } else {
    setSelesai(true);
  }
  };
  
  if (!soal) {
    return <div>Loading soal...</div>
  }

  const pilihJawaban = (opsi: string) => {
  
    if (jawabanDipilih) return;

  setJawabanDipilih(opsi);

  if (opsi === soal.jawaban) {
    if (timer > 5) {
      setPoin((prev) => prev + 10);
    } else {
      setPoin((prev) => prev + 5);
    }

  }

  setTimeout(() => {
    lanjutSoal();
  }, 1000);
  };
  

  if (selesai) {
    return (
      <div className="bg-gradient-to-br from-green-400 to-emerald-600 min-h-screen flex justify-center items-center">
        <div className=" text-center bg-white p-9 rounded-2xl shadow-lg w-[400px] ">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Hasil Kuis</h1>

          <p className="text-2xl font-semibold mb-2">Poin: {poin}</p>

          <p className="text-xl text-gray-600">Waktu: {totalWaktu} detik</p>
          <p className="text-xl text-gray-600">Predikat :</p>

          <button
            className="bg-green-500 text-white font-medium p-4 rounded-lg m-2 "
            // router.push("/components/Kuis/KuisLevel");
          >Kembali</button>
        </div>
      </div>
    );
  }
  

  return (
    <div>
      <div className="bg-white m-20 p-12 shadow-md rounded-lg ">
        <h2
          className={
            timer <= 5
              ? "text-red-500 font-bold flex justify-end text-2xl"
              : "text-black font-bold flex justify-end text-2xl"
          }
        >
          ⏱ {timer}
        </h2>
        <h1 className="font-bold text-2xl ">  {nomorSoal + 1}/ {soalLevel.length}</h1>

        <div className="border text-2xl rounded-xl text-center p-8 m-3 select-none">
          {soal.ayat}
        </div>

        <p className="select-none">{soal.soal}</p>

        {soal.pilihan.map((opsi) => (
          <div
            onClick={() => pilihJawaban(opsi)}
            key={opsi}
            className={`text-white text-center p-3 m-2 rounded-lg ${
              jawabanDipilih === opsi
                ? opsi === soal.jawaban
                  ? "bg-green-500"
                  : "bg-red-500"
                  : "bg-blue-500"
            }`}
          >
            {opsi}
          </div>
        ))}
      </div>
    </div>
  );
};


export default KuisPages;
