"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import dashboardMockup from "@/public/images/dashboardMockup.jpg";
import Footer from "@/app/components/(marketing)/Footer";
import Navbar from "@/app/components/(marketing)/Navbar";

const Construction = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <section className="py-20 px-6 bg-yellow-100 dark:bg-yellow-900">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Construction Inventory Management Made Simple
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Keep track of your tools, equipment, and materials across job
              sites with an easy-to-use system built for contractors and
              construction crews.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-yellow-600 text-white font-medium px-6 py-3 rounded-md hover:bg-yellow-700 dark:hover:bg-yellow-500 transition"
              >
                Try Binly Free
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={dashboardMockup}
                alt="Construction inventory"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Organize Job Sites and Keep Track of Every Tool
              </h2>
              <p className="text-gray-700 mb-4 dark:text-gray-300">
                No more misplaced tools or overbuying supplies. Binly gives your
                foremen and crews full visibility into what&apos;s available and
                what&apos;s checked out.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Assign tools and equipment to workers or crews</li>
                <li>Track item locations across multiple job sites</li>
                <li>Monitor check-in/check-out history</li>
                <li>Low-stock alerts for materials</li>
                <li>Smart search and tagging</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-yellow-100 py-20 px-6 dark:bg-yellow-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Purpose-Built for the Construction Industry
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              Binly is designed for boots-on-the-ground operations—simple enough
              for anyone on your crew to use, but powerful enough to manage jobs
              of any size.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 text-center dark:bg-gray-900">
          <h2 className="text-3xl font-bold mb-4">Get Started in Minutes</h2>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            Start organizing your construction inventory now—no training or
            setup required.
          </p>
          <Link
            href="/"
            className="inline-block bg-yellow-600 text-white font-medium px-6 py-3 rounded-md hover:bg-yellow-700 dark:hover:bg-yellow-500 transition"
          >
            Start Free Today
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Construction;
