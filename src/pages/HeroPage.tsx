import React from "react";
import Hero from "../components/HeroPage/Hero";
import CTA from "../components/HeroPage/CTA";
import Features from "../components/HeroPage/Features";
import Course from "../components/HeroPage/Course";
import Layout from "../components/HeroPage/layout";
import Pricing from "../components/subComponents/Pricing/Pricing";

const HeroPage = () => {
    return (
        <>
        <Layout>
           <Hero />
           <CTA />
           <Features />
           <Course />
           <Pricing/>
        </Layout>
        
       
        </>
      );
};

export default HeroPage;
