"use client";
import React, {useEffect, useState} from 'react';
import { FaArrowUp } from 'react-icons/fa';

const Scrollback = () => {
    const [balikDei, setbalikDei] = useState(false);

    // show tombol yg hide
    useEffect(() => {
            const toggleTerlihat = () => {
                if (window.scrollY > 300)
                    setbalikDei(true);
                else setbalikDei(false);
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
        {balikDei && (
            <button onClick={scrollToTop} className="bg-blue-950 cursor-pointer text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"
            >
                <FaArrowUp />

            </button>
        )}
    </div>
    );
};

export default Scrollback;