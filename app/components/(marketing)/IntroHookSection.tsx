"use client";

import Link from "next/link";
import React from "react";

const features = [
  {
    icon: "🏗️",
    title: "Create Workspaces",
    description:
      "Organize by garage, job site, or storage unit — all fully separated.",
  },
  {
    icon: "➕",
    title: "Add Items Fast",
    description:
      "Input item names, tags, quantities, and scan barcodes or QR codes.",
  },
  {
    icon: "🗃️",
    title: "Use Smart Locations",
    description:
      "Assign items to bins, racks, drawers — and scan to move or view contents.",
  },
  {
    icon: "🔁",
    title: "Track Item Status",
    description:
      "Know if items are available, checked-out, used, broken, or lost.",
  },
  {
    icon: "📦",
    title: "Check In & Out",
    description:
      "Assign items to people or projects. Set due dates, get return alerts.",
  },
];

const IntroHookSection = () => {
  return (
    <section className="py-24 text-center px-6 bg-sky-50 dark:bg-gray-900">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Organize your gear in minutes, not hours.
      </h2>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16">
        Binly removes the guesswork from tracking inventory. Add items, assign
        tools, and check gear in/out without spreadsheets or chaos.
      </p>
      <div className="max-w-2xl mx-auto mb-12">
        <Link
          href="/get-started"
          className="inline-block bg-sky-200 dark:bg-sky-700 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-sky-300 dark:hover:bg-sky-600 transition-colors"
        >
          Start Free Today
        </Link>
      </div>

      <div className="grid gap-10 max-w-6xl mx-auto sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-sky-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntroHookSection;
