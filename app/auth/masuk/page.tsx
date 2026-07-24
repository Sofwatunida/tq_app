"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import Link from "next/link";


export default function MasukPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    
    if (error) {
      alert("Anda belum mendaftar akun!");
      return;
    }

    alert("login berhasil");
    router.push("/");
  };

  //   if (!email || !password) {
  //     alert("Isi woi biasain!!");
  //     return;
  //   }

  //   alert("Login berhasil");
  //   router.push("/");
  // };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <div className=" flex items-center justify-center">
          <Image src={"/images/logo.png"} alt="img" width={100} height={100} />
        </div>
        <h1 className="text-2xl  text-center mb-6">Masuk dengan akun anda!</h1>
        <p className="font-medium mb-2">Email dan Password</p>
        <form onSubmit={handleLogin}>
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
            Belum punya akun?
            <Link
              href="/auth/daftar"
              className="font-bold text-blue-500 cursor-pointer"
            >
              Daftar disini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
