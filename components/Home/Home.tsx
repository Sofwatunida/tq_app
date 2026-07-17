"use client";
import React, { useEffect } from "react";
import Hero from "hero";
import About from "about";
import KuisLanding from "./KuisLanding/KuisLanding";
import Scrollback from "../Helper/scrollback";

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const Home = () => {

  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
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
