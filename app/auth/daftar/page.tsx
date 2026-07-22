

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabase";
import  { useState } from "react";


export default function DaftarPage() {

    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


  const router = useRouter();

  const handleDaftar = async (e: React.FormEvent) => {
    e.preventDefault();

     const { data, error } = await supabase.auth.signUp({
       email,
       password,
     });

  
    if (error) {
      alert("error sodara2ku");
      return;
    }

    await supabase.from("profiles").insert({
        id: data.user?.id,
        nama: nama,
        email: email,
    });
    
    alert("Pendaftaran Berhasil");
    router.push("/auth/masuk");
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <div className=" flex items-center justify-center">
          <Image src={"/images/logo.png"} alt="img" width={100} height={100} />
        </div>
        <h1 className="text-2xl  text-center mb-6">Daftarkan akun anda!</h1>
        <p className="font-medium mb-2">Isi form dibawah ini!</p>
        <form onSubmit={handleDaftar}>
          <input
            type="text"
            placeholder="Nama penggguna"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full border bg-white border-gray-500 rounded-lg p-3 mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border bg-white border-gray-500 rounded-lg p-3 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-white border-gray-500 rounded-lg p-3 mb-4"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className=" bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Masuk
            </button>
          </div>
          <p className="mt-3">
            Sudah punya akun?{" "}
            <Link
              href="/auth/masuk"
              className="font-bold text-blue-500 cursor-pointer"
            >
              Masuk disini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

