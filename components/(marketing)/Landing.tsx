"use client";

import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import IntroHookSection from "./IntroHookSection";
import HowItWorksSection from "./Features";
import PricingPlans from "./PricingPlans";
import TestimonialsSection from "./TestimonialsSection";
import FinalCallToAction from "./FinalCallToAction";
import Footer from "./Footer";
import ContactSection from "./ContactSection";

const Landing = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <IntroHookSection />
      <HowItWorksSection />
      <PricingPlans />
      <TestimonialsSection />
      <FinalCallToAction />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Landing;
