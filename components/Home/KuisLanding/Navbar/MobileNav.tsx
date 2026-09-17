import { CgClose } from "react-icons/cg";
import { NAVLINKS } from "@/constant/constant";
import React from "react";
type Props = {
  showNav: boolean;
  closeNav: () => void;
  handleAksesMenu: (halaman: string) => void;
};

const MobileNav = ({ showNav, closeNav, handleAksesMenu }: Props) => {
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
        {NAVLINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => handleAksesMenu(link.url)}
            className="text-left"
          >
            <p className="text-[30px] sm:text-[30px] font-semibold ml-12 w-fit border-b-[1.5px] border-white pb-1">
              {link.label}
            </p>
          </button>
        ))}

        <CgClose
          onClick={closeNav}
          className="fixed top-4 right-4 z-50 w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileNav;
