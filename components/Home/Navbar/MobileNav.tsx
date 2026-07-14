import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { NAVLINKS } from "@/constant/constant";
import React from "react";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

const MobileNav = ({ closeNav, showNav }: Props) => {
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
        className={`fixed ${navOpenCloseStyle} flex flex-col justify-center h-full w-[80%] sm:w-[60%] bg-cyan-600 text-white space-y-6 transform transition-all duration-500 delay-300 z-[1050]`}
      >
        {NAVLINKS.map((link) => (
          <Link key={link.id} href={link.url}>
            <p className="text-[20px] sm:text-[30px] ml-12 w-fit border-b-[1.5px] border-white pb-1">
              {link.label}
            </p>
          </Link>
        ))}

        <CgClose
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileNav;
