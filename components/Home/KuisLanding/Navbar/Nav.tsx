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
  user: User | null;
  handleAksesMenu: (halaman: string) => void;
};

const Nav = ({ openNav, user, handleAksesMenu }: Props) => {
  const router = useRouter();

  const [navBg, setNavBg] = useState(false);
  const [nama, setNama] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getNama = async () => {
      if (!user) {
        setNama("");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("nama_pengguna")
        .eq("id", user.id)
        .single();

      setNama(data?.nama_pengguna ?? "");
    };

    getNama();
  }, [user]);
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
      <div className="flex items-center justify-between h-full w-[90%] xl:w-[80%] mx-auto gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 min-w-0">
          <Logo />
        </div>

        {/* Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 flex-wrap">
          {NAVLINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleAksesMenu(link.url)}
              className="text-black hover:text-blue-500 font-medium duration-200 whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {!user ? (
            <>
              <button
                onClick={() => router.push("/auth/masuk")}
                className="font-bold text-blue-500 hover:text-blue-300 whitespace-nowrap px-1"
              >
                Masuk
              </button>

              <Link
                href="/auth/daftar"
                className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 whitespace-nowrap"
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
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {nama ? nama.charAt(0).toUpperCase() : "U"}
                </div>

                <IoChevronDown
                  className={`duration-200 hidden sm:block ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-[calc(100vw-2rem)] max-w-64 bg-white rounded-2xl shadow-xl border p-4 sm:p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className=" shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                      {nama ? nama.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl truncate">{nama}</h2>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
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
            className=" w-7 h-7 sm:w-8 sm:h-8 cursor-pointer lg:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
