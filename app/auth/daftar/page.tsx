"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/supabase";
import { useState } from "react";
import Swal from "sweetalert2";

// bikin komponen halaman
export default function DaftarPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // pendaftaran akun
  const handleDaftar = async (e: React.FormEvent) => {
    e.preventDefault();

    // validasi form
    if (!nama || !email || !password) {
     await Swal.fire({
            icon: "warning",
            title: "Form belum lengkapl!",
            text: "Silakan isi semua data!",
          });
          return;
        }

    // ck nmaa
     const { data: cekUser } = await supabase
       .from("profiles")
       .select("id")
       .eq("nama_pengguna", nama)
       .maybeSingle();

     if (cekUser) {
       await Swal.fire({
         icon: "error",
         title: "Nama sudah digunakan!",
         text: "silakan gunakan nama lain!",
       });
       return;
     }

    // untuk kirim ke supabes auth, daftar auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });


    if (error) {
       await Swal.fire({
              icon: "error",
              title: "Pendaftaran gagal!",
              text: "Email sudah terdaftar!",
            });
            return;
    }
   
    // masukin data inputan ke tabel propil
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user?.id,
        nama_pengguna: nama,
        email,
      });

    if (profileError) {
  
      await Swal.fire({
             icon: "error",
             title: "Gagal menyimpan profil",
             text: profileError.message,
           });
           return;
         
    }

    // berhasillll, setelah daftar nnti ke halaman masuk
    await Swal.fire({
           icon: "success",
           title: "Pendaftaran berhasil!",
           text: "Silakan login dengan akun anda!",
           timer: 1800,
           showConfirmButton: false,
         });
    
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
              Daftar
            </button>
          </div>
          <p className="mt-3">
            Sudah punya akun? 
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
