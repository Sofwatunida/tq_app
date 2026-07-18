"use client";
import React, {useEffect, useState} from 'react';
import { FaArrowUp } from 'react-icons/fa';
// ikon fanahhhhhhh

// make komponen named scrollback
const Scrollback = () => {
    const [terlihat, setterlihat] = useState(false);

    // show tombol yg hide
    useEffect(() => {
            const toggleTerlihat = () => {
                if (window.scrollY > 300)
                    setterlihat(true);
                else setterlihat(false);
            };
            window.addEventListener("scroll", toggleTerlihat);

            return () => window.removeEventListener("scroll", toggleTerlihat);
        }, []
    );
    

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (<div className="fixed bottom-4 animate-pulse right-4">
        {terlihat && (
            <button onClick={scrollToTop} className="bg-blue-950 cursor-pointer text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"
            >
                <FaArrowUp />

            </button>
        )}
    </div>
    );
};

export default Scrollback;