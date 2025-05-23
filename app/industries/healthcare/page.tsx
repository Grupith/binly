"use client";

import Footer from "@/components/(marketing)/Footer";
import Navbar from "@/components/(marketing)/Navbar";
import Image from "next/image";
import Link from "next/link";
import dashboardMockup from "@/public/images/dashboardMockup.jpg";

const Healthcare = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <section className="py-20 px-6 bg-fuchsia-100 dark:bg-fuchsia-900">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Inventory Software for Healthcare Teams
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Keep your medical equipment, supplies, and kits organized—whether
              you&apos;re managing a small clinic or a mobile health unit.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-fuchsia-600 text-white font-medium px-6 py-3 rounded-md hover:bg-fuchsia-700 dark:hover:bg-fuchsia-500 transition"
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
                alt="Healthcare inventory management"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Manage Supplies Across Rooms and Teams
              </h2>
              <p className="text-gray-700 mb-4 dark:text-gray-300">
                From PPE and surgical tools to medications and tech gear, Binly
                helps healthcare teams track usage, location, and availability.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Check in/out critical equipment between shifts</li>
                <li>Assign items to departments, rooms, or mobile kits</li>
                <li>Log usage history and track sterilization status</li>
                <li>Monitor low stock and expiration dates</li>
                <li>Provide access based on roles or locations</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-fuchsia-100 py-20 px-6 dark:bg-fuchsia-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Built for Clinics, Labs, and Mobile Providers
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              Whether you&apos;re working out of a hospital wing or a community
              van, Binly&apos;s flexible workspace model makes it easy to stay
              organized.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 text-center dark:bg-gray-900">
          <h2 className="text-3xl font-bold mb-4">Start Free for Your Team</h2>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            No training or setup required—get started in minutes.
          </p>
          <Link
            href="/"
            className="inline-block bg-fuchsia-600 text-white font-medium px-6 py-3 rounded-md hover:bg-fuchsia-700 dark:hover:bg-fuchsia-500 transition"
          >
            Start Free Today
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Healthcare;
