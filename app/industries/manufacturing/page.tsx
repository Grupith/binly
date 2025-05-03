"use client";

import Footer from "@/app/components/(marketing)/Footer";
import Navbar from "@/app/components/(marketing)/Navbar";
import Image from "next/image";
import Link from "next/link";
import dashboardMockup from "@/public/images/dashboardMockup.jpg";

const Manufacturing = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <section className="py-20 px-6 bg-orange-100 dark:bg-orange-900">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Organize Manufacturing Inventory with Ease
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Track tools, parts, safety gear, and production supplies — all
              from a single, simple platform designed for shop floors and
              warehouses.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-orange-600 text-white font-medium px-6 py-3 rounded-md hover:bg-orange-700 dark:hover:bg-orange-500 transition"
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
                alt="Manufacturing inventory"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Built for Fabrication Shops, Production Lines & Warehouses
              </h2>
              <p className="text-gray-700 mb-4 dark:text-gray-300">
                Binly helps you reduce downtime and keep track of the gear and
                materials your team depends on every day — without getting in
                their way.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Track tools and assets by machine, shift, or department</li>
                <li>Check gear in/out between workers and stations</li>
                <li>Monitor inventory levels across multiple buildings</li>
                <li>Receive alerts when parts run low or go missing</li>
                <li>Log usage history and maintenance needs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-orange-100 py-20 px-6 dark:bg-orange-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Simple, Powerful Tracking Without the ERP Bloat
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              Binly works great as a lightweight alternative to complex systems
              — letting you get organized quickly, while still offering the
              visibility and control manufacturing teams need.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 text-center dark:bg-gray-900">
          <h2 className="text-3xl font-bold mb-4">Start Free for Your Team</h2>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            Create your first workspace and track your manufacturing inventory
            in minutes.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-600 text-white font-medium px-6 py-3 rounded-md hover:bg-orange-700 dark:hover:bg-orange-500 transition"
          >
            Start Free Today
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Manufacturing;
