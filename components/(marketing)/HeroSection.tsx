"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import BoxesOnCart from "@/public/images/Checking-boxes-cuate.svg";
import PersonWithBoxes from "@/public/images/Checking-boxes-bro.svg";
import CheckingBoxesBro from "@/public/images/Boxes-on-cart.svg";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center py-24 bg-white dark:bg-gray-900 text-center px-4">
      <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-full overflow-hidden">
        <Image
          src={PersonWithBoxes}
          alt="3d icon boxes on a cart"
          className="w-24 sm:w-36 mx-auto mb-6"
        />
        <Image
          src={BoxesOnCart}
          alt="3d icon with a person stacking boxes"
          className="w-24 sm:w-36 mx-auto mb-6"
        />
        <Image
          src={CheckingBoxesBro}
          alt="3d icon with a person checking boxes"
          className="w-24 sm:w-36 mx-auto mb-6"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Simple
        <span className="text-sky-600"> Inventory Management</span>
        <br />
        for homes, shops, and small teams
      </h1>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
        Easily track tools, materials, and equipment — no training or tech
        skills needed.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="default" className="shadow-sm hover:shadow-lg">
          <Link href="/login">Get Started</Link>
        </Button>
        <Button variant="outline" className="shadow-sm hover:shadow-lg">
          <Link href="#features">See How It Works</Link>
        </Button>
      </div>

      {/* Demo video */}
      <section className="w-full bg-white dark:bg-gray-900 flex justify-center pt-20 pb-10 px-4">
        <div className="w-full max-w-4xl aspect-video shadow-xl">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Binly Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </section>
  );
};

export default HeroSection;
