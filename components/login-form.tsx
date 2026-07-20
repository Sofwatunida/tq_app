"use client";

import { supabase } from "@/lib/supabase/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();


    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email atau Password salah");
      setLoading(false);
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <div className=" flex items-center justify-center">
          <Image src={"/images/logo.png"} alt="img" width={100} height={100} />
        </div>
        <h1 className="text-2xl  text-center mb-6">Masuk dengan akun anda!</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            className="w-full border bg-white border-gray-500 rounded-lg p-3 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full border bg-white border-gray-500 rounded-lg p-3 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className=" bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              {loading ? "Loading..." : "Masuk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
