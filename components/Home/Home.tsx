import React from "react";
import Hero from "hero";
import About from "../About/About";
import KuisLanding from "./KuisLanding/KuisLanding";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <About />
      <KuisLanding />
    </div>
  );
};

export default Home;
