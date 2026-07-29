"use client";
import React from "react";
import Logo_1 from "logo";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/auth")) {
    return null;
  }

  return (
    <div className="width-full bg-white border-t border-gray-200 ">
      <div className="text-black">
        <div className="w-[80%] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-16">
          {/* kolom pertmaeee */}
          <div className="space-y-4  ">
            <Logo_1 />
            <p className=" font-medium leading-relaxed">
              Platform pembelajaran tajwid interaktif yang membantu pengguna
              memahami hukum tajwid melalui materi dan kuis secara mudah.
            </p>
          </div>
          {/* kolom kedue */}

          <div>
            <h3 className="font-bold mb-3 text-3xl text-blue-500">Menu</h3>
            <ul className="space-y-4 font-medium text-black">
              <li className="hover:text-blue-500 cursor-pointer">Beranda</li>
              <li className="hover:text-blue-500 cursor-pointer">Materi</li>
              <li className="hover:text-blue-500 cursor-pointer">Kuis</li>
              <li className="hover:text-blue-500 cursor-pointer">Peringkat</li>
            </ul>
          </div>
          {/* kolom telu */}
          <div className="cursor-pointer">
            <h3 className="font-bold mb-3 text-3xl text-blue-500">Kontak</h3>
            <ul className="space-y-5 font-medium text-black">
              <li className="flex items-start gap-3 hover:text-blue-500">
                <span className="text-black text-lg ">📍</span>
                <span>
                  Puncak <br />
                  Bogor
                </span>
              </li>
              <li className="flex items-start gap-3 hover:text-blue-500">
                <span className="text-black text-lg ">📞</span>
                <p>0851-5669-5976</p>
              </li>
              <li className="flex items-start gap-3 hover:text-blue-500">
                <span className="text-black text-lg ">📧</span>
                <span>ncopjamil@gmail.com</span>
              </li>
            </ul>
          </div>
          {/* kolom papat */}
          <div className="lg:ml-20">
            <h3 className="font-bold mb-3 text-3xl text-blue-500">Media sosial</h3>
            <ul className="space-y-4 font-medium text-black">
              <li className="hover:text-blue-500 cursor-pointer">Github</li>
              <li className="hover:text-blue-500 cursor-pointer">LinkedIn</li>
              <li className="hover:text-blue-500 cursor-pointer">Instagram</li>
            </ul>
          </div>
          
        </div>
      </div>
      {/* sosmed part */}

      <div className="border-t border-gray-200 py-6 text-center text-sm text-white">
        {" "}
        2026 ncopstar. All Right Reserved
      </div>
    </div>
  );
};

export default Footer;
