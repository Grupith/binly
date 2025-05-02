"use client";

import React from "react";
import Navbar from "../components/(marketing)/Navbar";
import Footer from "../components/(marketing)/Footer";

const AboutPage = () => {
  return (
    <>
      <div>
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-20 text-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About Binly</h1>

          <p className="mb-6 text-lg text-gray-700">
            Binly was built out of a simple frustration — most inventory systems
            are bloated, outdated, and overwhelming to set up. Whether
            you`&apos;re a tradesperson, shop owner, or just trying to organize
            your home workspace, you shouldn`&apos;t have to spend hours
            learning clunky software just to track your tools or gear.
          </p>

          <p className="mb-6 text-gray-700">
            We noticed a gap: there were either massive enterprise systems
            designed for warehouses, or overly simplistic apps that
            couldn`&apos;t scale with real needs. Binly sits right in the middle
            — simple enough for everyday use, but powerful enough to grow with
            you.
          </p>

          <p className="mb-6 text-gray-700">
            Our goal is to make inventory management feel invisible — something
            you set up in minutes, not days. With quick item entry, barcode
            scanning, workspace sorting, and check-in/out features, Binly makes
            it easy to stay organized without the headaches.
          </p>

          <p className="mb-6 text-gray-700">
            We`&apos;re here for anyone who`&apos;s ever lost track of a tool,
            duplicated a supply order, or spent too long digging through
            spreadsheets. Binly is built for people who want modern simplicity —
            not complexity.
          </p>

          <p className="text-gray-700 italic">
            Thanks for checking us out. We`&apos;re excited to help you get
            organized, stay efficient, and focus more on the work that actually
            matters.
          </p>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
