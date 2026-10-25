"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6 px-4">
      <p className="text-center text-xs sm:text-sm text-gray-500 break-words">
        © 2026 <span className="font-semibold text-blue-500">TajwidQu</span>.
        All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
