import React from "react";
import Hero from "hero";
import About from "../About/About";
import KuisLanding from "./KuisLanding/KuisLanding";
import Scrollback from "../Helper/scrollback";

const Home = () => {
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
