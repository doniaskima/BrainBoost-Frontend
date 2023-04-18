import React from "react";
import Hero from "../components/HeroPage/Hero";
import CTA from "../components/HeroPage/CTA";
import Features from "../components/HeroPage/Features";
import Course from "../components/HeroPage/Course";
import Pricing from "../components/HeroPage/Pricing";

const HeroPage = () => {
    return (
        <>
          <Hero />
          <CTA />
          <Features />
          <Course />
          <Pricing />
        </>
      );
};

export default HeroPage;
