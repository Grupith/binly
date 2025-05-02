"use client";

import React from "react";
import dashboardMockup from "@/public/images/dashboardMockup.jpg";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="px-6 py-12 max-w-full">
      <div className="text-center mb-12 py-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Features
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
          Track, assign, and manage your inventory with ease - no spreadsheets
          needed.
        </p>
      </div>
      {/* Feature: Organizing */}
      <div
        id="feature-organizing"
        className="w-screen -mx-6 px-6 bg-gray-100 py-16"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <p className="text-sky-600 uppercase font-semibold mb-2">
              Organizing
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Organize and automate your inventory at the touch of a button.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>📤 Easily upload your existing inventory list into Binly.</li>
              <li>🗂️ Organize items by location, category, or workspace.</li>
              <li>✅ Add item details with custom fields, images, and tags.</li>
            </ul>
          </div>
          <div>
            <div className="p-4">
              <Image
                src={dashboardMockup}
                alt="Binly inventory interface"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature: Locations */}
      <div
        id="feature-locations"
        className="w-screen -mx-6 px-6 bg-gray-50 py-16"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20 md:flex-row-reverse">
          <div>
            <Image
              src={dashboardMockup}
              alt="Smart location management"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="text-left">
            <p className="text-sky-600 uppercase font-semibold mb-2">
              Smart Locations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Know exactly where your gear lives.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>📍 Assign items to shelves, bins, vehicles, or job sites.</li>
              <li>
                🔍 Instantly locate items using location filters or QR scans.
              </li>
              <li>📦 Visualize inventory spread across locations.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature: Check In & Out */}
      <div
        id="feature-checkin"
        className="w-screen -mx-6 px-6 bg-sky-100 py-16"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20">
          <div className="text-left">
            <div className="flex items-center space-x-4 mb-4 ">
              <p className="text-sky-600 uppercase font-semibold">
                Check In & Out
              </p>
              <Badge variant="default" className="bg-sky-600">
                Pro
              </Badge>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Track who has what — and when it’s due back.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>🔁 Assign tools or materials to users or jobs.</li>
              <li>📅 Set due dates and get return alerts.</li>
              <li>📊 View a full log of usage history for every item.</li>
            </ul>
          </div>
          <div>
            <div className="p-4">
              <Image
                src={dashboardMockup}
                alt="Binly inventory interface"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Feature: Barcode / QR Code Support */}
      <div
        id="feature-barcodes"
        className="w-screen -mx-6 px-6 bg-gray-50 py-16"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <Image
              src={dashboardMockup}
              alt="Barcode and QR code support"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="text-left">
            <p className="text-sky-600 uppercase font-semibold mb-2">
              Barcode / QR Code Support
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Scan, search, and manage with ease.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>📱 Scan items using any phone or tablet.</li>
              <li>🔗 Link QR codes to specific inventory items.</li>
              <li>🔍 Instantly pull up item details with a scan.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature: Bulk Item Entry / CSV Import */}
      <div
        id="feature-bulk-entry"
        className="w-screen -mx-6 px-6 bg-sky-50 py-16"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20 md:flex-row-reverse">
          <div className="text-left">
            <p className="text-sky-600 uppercase font-semibold mb-2">
              Bulk Item Entry
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Import your inventory in seconds.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>📥 Upload CSV files to populate your inventory instantly.</li>
              <li>🧩 Map fields to custom attributes and locations.</li>
              <li>📊 Reduce setup time for large inventories.</li>
            </ul>
          </div>
          <div>
            <div className="p-4">
              <Image
                src={dashboardMockup}
                alt="Binly inventory interface"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature: Smart Alerts for Overdue Items */}
      <div
        id="feature-alerts"
        className="w-screen -mx-6 px-6 bg-gray-100 py-16"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <Image
              src={dashboardMockup}
              alt="Overdue alerts"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-4 mb-4 ">
              <p className="text-sky-600 uppercase font-semibold">
                Smart Alerts{" "}
              </p>
              <Badge variant="default" className="bg-sky-600">
                Pro
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Stay ahead with automated alerts.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>⏰ Get notified when items are overdue or missing.</li>
              <li>📩 Send automatic reminders to users.</li>
              <li>📉 Avoid costly losses or delays.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature: Pick Lists for Repeat Jobs */}
      <div
        id="feature-picklists"
        className="w-screen -mx-6 px-6 bg-white py-16"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20 md:flex-row-reverse">
          <div className="text-left">
            <div className="flex items-center space-x-4 mb-4 ">
              <p className="text-sky-600 uppercase font-semibold">
                Pick Lists{" "}
              </p>
              <Badge variant="default" className="bg-sky-600">
                Pro
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Reuse kits and materials for frequent tasks.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>📋 Create pre-defined lists of tools and materials.</li>
              <li>🚚 Quickly prepare jobs using saved templates.</li>
              <li>🔁 Reduce errors and time spent gathering items.</li>
            </ul>
          </div>
          <div>
            <div className="p-4">
              <Image
                src={dashboardMockup}
                alt="Binly inventory interface"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature: Usage & Status Logs */}
      <div id="feature-logs" className="w-screen -mx-6 px-6 bg-sky-50 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20">
          <div>
            <Image
              src={dashboardMockup}
              alt="Usage and history logs"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-4 mb-4 ">
              <p className="text-sky-600 uppercase font-semibold">
                Usage Logs{" "}
              </p>
              <Badge variant="default" className="bg-sky-600">
                Pro
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              See the full story of every item.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>📝 Track check-in/out history and status updates.</li>
              <li>🧑‍🔧 See who used what, when, and where.</li>
              <li>📁 Download logs for accountability or records.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature: Role-Based Access */}
      <div id="feature-access" className="w-screen -mx-6 px-6 bg-white py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mt-20 md:flex-row-reverse">
          <div className="text-left">
            <div className="flex items-center space-x-4 mb-4 ">
              <p className="text-sky-600 uppercase font-semibold">
                Role-Based Access{" "}
              </p>
              <Badge variant="default" className="bg-sky-600">
                Pro
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Keep control without slowing your team down.
            </h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li>
                🔒 Control what employees or contractors can view or edit.
              </li>
              <li>📂 Grant access to specific workspaces or items only.</li>
              <li>👥 Manage roles for owners, managers, and staff.</li>
            </ul>
          </div>
          <div>
            <div className="p-4">
              <Image
                src={dashboardMockup}
                alt="Binly inventory interface"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
