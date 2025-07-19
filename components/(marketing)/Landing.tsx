"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
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
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

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
