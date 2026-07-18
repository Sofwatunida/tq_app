"use client";
import React, { useEffect } from "react";
import Hero from "hero";
import About from "about";
import KuisLanding from "kuisLanding";
import Scrollback from "scrollback";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const Home = () => {

  useEffect(() => {
    const initAOS = async () => {
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };

    initAOS( )
      
  }, []);
  
  return (
    <div className="overflow-hidden">
      <Hero />
      <About />
      <KuisLanding />
      <Scrollback />
    </div>
  );
};

export default Home;
