"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <p className="text-center text-sm text-gray-500">
        © 2026 <span className="font-semibold text-blue-500">TajwidQu</span>.
        All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
