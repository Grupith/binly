"use client";

import React from "react";
import Navbar from "../../components/(marketing)/Navbar";
import Footer from "../../components/(marketing)/Footer";
import Image from "next/image";

const AboutPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <div className="mb-12">
            <Image
              src="/images/Consulting-rafiki.svg"
              alt="About Binly"
              width={1200}
              height={600}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            The Story Behind Binly
          </h1>

          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            Binly started with a simple problem — organizing tools and gear
            shouldn&apos;t require outdated software or hours of setup. Whether
            you&apos;re running a shop, managing a team, or just tired of losing
            stuff in your garage, we wanted to make things easier.
          </p>

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Most systems out there are either bloated warehouse software or too
            basic to be useful. Binly is the sweet spot — intuitive for personal
            use, but smart enough to scale with your business.
          </p>

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            With quick item entry, barcode scanning, visual sorting by
            workspace, and simple check-in/out flows, Binly keeps your stuff
            tracked and your head clear — no steep learning curve required.
          </p>

          <p className="mb-6 text-gray-700 dark:text-gray-300">
            If you&apos;ve ever lost a tool, re-bought something you already
            had, or wasted time wrestling with a spreadsheet, you&apos;re not
            alone. Binly was built for real people — not IT departments.
          </p>

          <p className="text-gray-700 dark:text-gray-400 italic">
            Thanks for checking out Binly. We hope it helps you stay organized
            and gives you back time for what matters most.
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
