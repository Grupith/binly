"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center py-24 bg-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Simple
        <span className="text-sky-600"> Inventory Management</span>
        <br />
        for Homes, Shops, and Small Teams
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl">
        Easily track tools, materials, and equipment — no training or tech
        skills needed.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Button variant="outline">
          <Link href="#how-it-works">See How It Works</Link>
        </Button>
        <Button variant="default">
          <Link href="/get-started">Get Started</Link>
        </Button>
      </div>

      {/* Optional: Add a product mockup or animation */}
      {/* <div className="mt-10">
        <img src="/mockup.png" alt="Product mockup" className="mx-auto w-full max-w-md" />
      </div> */}
    </section>
  );
};

export default HeroSection;
