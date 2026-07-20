"use client";

import { useState } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

const WrapperNav = () => {
  const pathname = usePathname();

   const [showNav, setShowNav] = useState(false);

   const openNavHandler = () => setShowNav(true);
   const closeNavHandler = () => setShowNav(false);

  if (pathname.startsWith("/auth")) {
    return null;
  }


  return (
    <div>
      <Nav openNav={openNavHandler} />
      <MobileNav
        showNav={showNav}
        closeNav={closeNavHandler}
      />
    </div>
  );
};

export default WrapperNav;
