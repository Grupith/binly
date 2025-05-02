"use client";

import React from "react";

const IntroHookSection = () => {
  return (
    <section className="py-20 text-center px-4 bg-sky-100">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
        Organize your gear in minutes, not hours.
      </h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-12">
        Binly removes the guesswork from tracking inventory. Add items, assign
        tools, and check gear in/out without spreadsheets or chaos.
      </p>

      <div className="grid gap-8 max-w-5xl mx-auto text-left sm:grid-cols-2 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">🏗️ Create Workspaces</h3>
          <p className="text-gray-700">
            Organize by garage, job site, or storage unit — all fully separated.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">➕ Add Items Fast</h3>
          <p className="text-gray-700">
            Input item names, tags, quantities, and scan barcodes or QR codes.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">🗃️ Use Smart Locations</h3>
          <p className="text-gray-700">
            Assign items to bins, racks, drawers — and scan to move or view
            contents.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">🔁 Track Item Status</h3>
          <p className="text-gray-700">
            Know if items are available, checked-out, used, broken, or lost.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">📦 Check In & Out</h3>
          <p className="text-gray-700">
            Assign items to people or projects. Set due dates, get return
            alerts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroHookSection;
