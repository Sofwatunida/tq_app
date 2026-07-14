"use client"
import Link from "next/link";
import Logo from "@/components/Helper/Logo";
import { NAVLINKS } from "@/constant/constant";
import React, { useEffect, useState } from "react";
import { HiBars3BottomRight } from "react-icons/hi2";



type Props = {
  openNav : () => void
};

const Nav = ({openNav}:Props) => {

  const [navBg, setNavBg] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (window.scrollY >= 90) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    // =====shadow scroll
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  },
  []);
  return (
    <div className={`transition-all ${navBg ? "bg-white shadow-md":"fixed"} duration-200 h-[12vh] fixed w-full z-50`}>
     {/*======shadow scroll end  */}
      <div className="flex items-center justify-between h-full w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAVLINKS.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-black hover:text-cyan-600 font-medium transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* profil */}
        <div className="flex items-center space-x-4">
          <button className="px-6 py-3 rounded-lg font-semibold text-sm cursor-pointer hover:bg-cyan-600 transition-all duration-200 bg-cyan-700 text-white">Profil</button>
          {/*Burger menu */}
          <HiBars3BottomRight 
          onClick={openNav}
          className="w-8 h-8 cursor-pointer text-black lg:hidden"/>
        </div>
      </div>
    </div>
  );
};

export default Nav;