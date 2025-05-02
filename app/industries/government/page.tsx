"use client";

import Image from "next/image";
import Link from "next/link";
import dashboardMockup from "@/public/images/dashboardMockup.jpg";
import Footer from "@/app/components/(marketing)/Footer";
import Navbar from "@/app/components/(marketing)/Navbar";

export default function GovernmentPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-800">
        <section className="py-20 px-6 bg-sky-50">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Inventory Software Built for Government Agencies
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Track equipment, tools, supplies, and assets across departments
              with a secure and simple system built for public agencies.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-sky-600 text-white font-medium px-6 py-3 rounded-md hover:bg-sky-700 transition"
              >
                Try Binly Free
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={dashboardMockup}
                alt="Government inventory example"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Simplify Asset Management Across Departments
              </h2>
              <p className="text-gray-700 mb-4">
                From city maintenance crews to public works teams, Binly helps
                you track what you have, where it is, and who’s using it.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Check in/out system for gear and equipment</li>
                <li>Assign items to specific departments or people</li>
                <li>
                  Track locations like vehicles, warehouses, and job sites
                </li>
                <li>Limit access with simple role-based permissions</li>
                <li>Log usage and monitor overdue returns</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-sky-100 py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Built with Simplicity and Compliance in Mind
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              No bloated features or training required. Binly is secure,
              lightweight, and intuitive for any staff member to use—while
              maintaining detailed logs for transparency and reporting.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Today, Free Forever</h2>
          <p className="text-gray-600 mb-6">
            Create your first workspace and start organizing your agency`&apos;s
            inventory in minutes.
          </p>
          <Link
            href="/"
            className="inline-block bg-sky-600 text-white font-medium px-6 py-3 rounded-md hover:bg-sky-700 transition"
          >
            Get Started
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
