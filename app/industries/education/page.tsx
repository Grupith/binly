"use client";

import Image from "next/image";
import Link from "next/link";
import dashboardMockup from "@/public/images/dashboardMockup.jpg";
import Footer from "@/app/components/(marketing)/Footer";
import Navbar from "@/app/components/(marketing)/Navbar";

const Education = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <section className="py-20 px-6 bg-purple-100 dark:bg-purple-900">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              School Inventory Tracking Made Simple
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
              Track classroom supplies, lab gear, technology, and assets across
              campuses with a solution built for education teams.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-md hover:bg-purple-700 dark:hover:bg-purple-500 transition"
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
                alt="Education inventory"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Manage Everything From Classrooms to Campus IT
              </h2>
              <p className="text-gray-700 mb-4 dark:text-gray-300">
                From Chromebooks and tablets to sports gear and science lab
                kits, Binly helps teachers and staff know what&apos;s available,
                where it is, and when it&apos;s due back.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Assign supplies and equipment to rooms or staff</li>
                <li>Check-in/check-out system for shared resources</li>
                <li>Track items by department, grade level, or program</li>
                <li>Prevent lost equipment and duplicate orders</li>
                <li>Enable staff to log and monitor usage</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-purple-100 py-20 px-6 dark:bg-purple-950">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Built for Teachers, Admins & Districts
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
              Binly is simple enough for individual teachers and scalable enough
              for district-wide deployments — with role-based access and logs to
              help everyone stay on the same page.
            </p>
          </div>
        </section>

        <section className="py-20 px-6 text-center dark:bg-gray-900">
          <h2 className="text-3xl font-bold mb-4">
            Start Free for Your School
          </h2>
          <p className="text-gray-600 mb-6 dark:text-gray-300">
            Organize and track your education inventory in just a few clicks.
          </p>
          <Link
            href="/"
            className="inline-block bg-purple-600 text-white font-medium px-6 py-3 rounded-md hover:bg-purple-700 dark:hover:bg-purple-500 transition"
          >
            Start Free Today
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Education;
