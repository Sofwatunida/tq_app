import React from 'react';
import Logo from '@/components/Helper/Logo';

const Footer = () => {
    return (
      <div className="width-full bg-blue-600 border-t border-gray-200 mt-20">
        <div className="w-[80%] mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-16">
          {/* kolom pertmaeee */}
          <div className="space-y-4  ">
            <Logo />
            <p className="text-white text-sm leading-relaxed">
              Platform pembelajaran tajwid interaktif yang membantu pengguna
              memahami hukum tajwid melalui materi dan kuis secara mudah.
            </p>
          </div>
          {/* kolom kedue */}
          <div>
            <h3 className="text-white font-medium mb-3">Menu</h3>
            <ul className="space-y-4 text-sm text-white">
              <li className="hover:text-blue-300 cursor-pointer">Beranda</li>
              <li className="hover:text-blue-300 cursor-pointer">Materi</li>
              <li className="hover:text-blue-300 cursor-pointer">Kuis</li>
              <li className="hover:text-blue-300 cursor-pointer">Peringkat</li>
            </ul>
          </div>
          {/* kolom telu */}
          <div>
            <h3 className="text-white font-medium mb-3">Bantuan</h3>
            <ul className="space-y-4 text-sm text-white">
              <li className="hover:text-blue-300 cursor-pointer">Tentang Aplikasi</li>
              <li className="hover:text-blue-300 cursor-pointer">FAQ</li>
              <li className="hover:text-blue-300 cursor-pointer">Panduan Penggunaan</li>
              <li className="hover:text-blue-300 cursor-pointer">Kebijakan</li>
            </ul>
          </div>
          {/* kolom papat */}
          <div className="cursor-pointer">
            <h3 className="text-white font-medium mb-3">Kontak</h3>
            <ul className="space-y-5 text-sm text-white">
              <li className="flex items-start gap-3 hover:text-blue-300">
                <span className="text-pink-500 text-lg ">📍</span>
                <span>
                  Puncak <br />
                  Bogor
                </span>
              </li>
              <li className="flex items-start gap-3 hover:text-blue-300">
                <span className="text-pink-500 text-lg ">📞</span>
                <p>0851-5669-5976</p>
              </li>
              <li className="flex items-start gap-3 hover:text-blue-300">
                <span className="text-pink-500 text-lg ">📧</span>
                <span>ncopjamil@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
};

export default Footer;