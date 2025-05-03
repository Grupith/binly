"use client";

import Footer from "@/app/components/(marketing)/Footer";
import Navbar from "@/app/components/(marketing)/Navbar";
import Image from "next/image";
import Link from "next/link";
import dashboardMockup from "@/public/images/dashboardMockup.jpg";

const Retail = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <section className="py-20 px-6 bg-rose-100 dark:bg-rose-900">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Retail Inventory Simplified
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Track store supplies, backroom stock, and equipment across
              multiple locations with ease.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-rose-600 text-white font-medium px-6 py-3 rounded-md hover:bg-rose-700 dark:hover:bg-rose-500 transition"
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
                alt="Retail inventory management"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Manage Retail Supplies, Tools, and Assets in One Place
              </h2>
              <p className="text-gray-700 mb-4 dark:text-gray-300">
                Whether you&apos;re a small shop or managing multiple
                storefronts, Binly helps you monitor supplies, track usage, and
                reduce loss.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Assign supplies to locations or store departments</li>
                <li>Log usage and condition of shared equipment</li>
                <li>Track inventory in backrooms and storage areas</li>
                <li>Receive low stock alerts for key supplies</li>
                <li>Use QR codes for fast check-in/check-out</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-rose-100 py-20 px-6 dark:bg-rose-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Keep Your Retail Team Organized
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              Binly is built for speed and simplicity — perfect for retail teams
              that need to stay efficient and keep stores running smoothly
              without complex software.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 text-center dark:bg-gray-900">
          <h2 className="text-3xl font-bold mb-4">Start Free for Your Store</h2>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            Set up your store&apos;s inventory and start tracking in minutes.
          </p>
          <Link
            href="/"
            className="inline-block bg-rose-600 text-white font-medium px-6 py-3 rounded-md hover:bg-rose-700 dark:hover:bg-rose-500 transition"
          >
            Start Free Today
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Retail;
