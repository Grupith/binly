"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";

const HeroSection = () => {
  const { signInWithGoogle } = useGoogleSignIn();
  return (
    <section className="flex flex-col items-center justify-center pt-36 pb-10 bg-gradient-to-br from-sky-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-center px-6">
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
        <span className="text-sky-600 font-bold"> Lightweight </span>
        Inventory
        <br className="hidden md:block" /> Management Software
      </h1>
      <p className="text-xl md:text-xl text-muted-foreground mb-8 max-w-2xl tracking-tight">
        Add items, assign them to locations, and stay organized. Built for small
        businesses who need clarity — not complexity.
      </p>
      <div className="flex gap-4 flex-wrap justify-center pb-6">
        <Button
          variant="default"
          className="shadow-sm hover:shadow-lg cursor-pointer"
          onClick={signInWithGoogle}
        >
          Try for Free
        </Button>
        <Button variant="outline" className="shadow-sm hover:shadow-lg">
          <Link href="#pricing">Pricing Plans</Link>
        </Button>
      </div>

      {/* Demo photo */}
      <div className="w-full flex justify-center pt-4 pb-16 px-6">
        <div className="w-full max-w-4xl relative border rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/dashboardMockup.jpg"
            alt="Binly Dashboard Mockup"
            width={1920}
            height={1080}
            className="w-full h-full rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
