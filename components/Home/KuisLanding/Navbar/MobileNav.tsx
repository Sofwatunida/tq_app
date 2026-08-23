import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { NAVLINKS } from "@/constant/constant";
import React from "react";
import { User } from "@supabase/supabase-js";
type Props = {
  showNav: boolean;
  closeNav: () => void;
  user: User | null;
  handleAksesKuis: (halaman: string) => void;
};

const MobileNav = ({
  showNav,
  closeNav,
  user,
  handleAksesKuis,
}: Props) => {

  const navOpenCloseStyle = showNav ? "translate-x-0" : "-translate-x-full";

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={closeNav}
        className={`fixed inset-0 ${navOpenCloseStyle} transform transition-all duration-500 z-[1002] bg-black/70`}
      ></div>

      {/* Mobile Menu */}
      <div
        className={`fixed ${navOpenCloseStyle} flex flex-col justify-center h-full w-[80%] sm:w-[60%] bg-blue-700 text-white space-y-6 transform transition-all duration-500 delay-300 z-[1050]`}
      >
        {NAVLINKS.filter((link) => {
          if (user) return true;

          return link.label === "Beranda" || link.label === "Materi";
        }).map((link) => {
          const isProtected =
            link.url === "/kuisLevel" || link.url === "/predikat";

          if (isProtected) {
            return (
              <button
                key={link.id}
                onClick={() => handleAksesKuis(link.url)}
                className="text-left"
              >
                <p className="text-[30px] sm:text-[30px] font-semibold ml-12 w-fit border-b-[1.5px] border-white pb-1">
                  {link.label}
                </p>
              </button>
            );
          }

          return (
            <Link key={link.id} href={link.url} onClick={closeNav}>
              <p className="text-[30px] sm:text-[30px] font-semibold ml-12 w-fit border-b-[1.5px] border-white pb-1">
                {link.label}
              </p>
            </Link>
          );
        })}

        <CgClose
          onClick={closeNav}
          className=" top-[0.7rem] k-[1.4rem] w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileNav;
