"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Logo from "@/components/Helper/Logo";
import { NAVLINKS } from "@/constant/constant";

import { supabase } from "@/lib/supabase/supabase";
import { User } from "@supabase/supabase-js";

import { HiBars3BottomRight } from "react-icons/hi2";
import { IoChevronDown } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const router = useRouter();

  const [navBg, setNavBg] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [nama, setNama] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  
  // Ambil user login
  
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);

        const { data } = await supabase
          .from("profiles")
          .select("nama_pengguna")
          .eq("id", user.id)
          .single();

        if (data) {
          setNama(data.nama_pengguna);
        }
      } else {
        setUser(null);
        setNama("");
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);

        const { data } = await supabase
          .from("profiles")
          .select("nama_pengguna")
          .eq("id", session.user.id)
          .single();
        
        setNama(data?.nama_pengguna ?? "");
      } else {
        setUser(null);
        setNama("");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

    
  
  // Shadow Navbar

  useEffect(() => {
    const handler = () => {
      setNavBg(window.scrollY >= 90);
    };

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);


  // Logout
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <div
      className={`fixed w-full z-50 transition-all duration-200 h-[12vh] ${
        navBg ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-full w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Logo />

        {/* Menu */}
        <div className="hidden lg:flex items-center gap-10">
          {NAVLINKS.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-black hover:text-blue-500 font-medium duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => router.push("/auth/masuk")}
                className="font-bold text-blue-500 hover:text-blue-300"
              >
                Masuk
              </button>

              <Link
                href="/auth/daftar"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600"
              >
                Daftar
              </Link>
            </>
          ) : (
              
              // profile
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                  {nama ? nama.charAt(0).toUpperCase() : "U"}
                </div>

                <IoChevronDown
                  className={`duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      {nama ? nama.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div>
                      <h2 className="font-bold text-3xl">{nama}</h2>
                      <p className="text-medium text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-500 py-2 text-white hover:bg-red-600 duration-200 font-bold"
                  >
                    <FiLogOut />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Burger */}
          <HiBars3BottomRight
            onClick={openNav}
            className="w-8 h-8 cursor-pointer lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
