import React from "react";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Binly
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Simple inventory management for homes, shops, and small teams.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Product
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/#features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link href="/#pricing" className="hover:underline">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:underline">
                How It Works
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Company
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Legal
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Social
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="https://x.com/BinlyInventory"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                X (Twitter)
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Industries
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/industries/government" className="hover:underline">
                Government
              </Link>
            </li>
            <li>
              <Link href="/industries/construction" className="hover:underline">
                Construction
              </Link>
            </li>
            <li>
              <Link href="/industries/education" className="hover:underline">
                Education
              </Link>
            </li>
            <li>
              <Link href="/industries/retail" className="hover:underline">
                Retail
              </Link>
            </li>
            <li>
              <Link href="/industries/healthcare" className="hover:underline">
                Healthcare
              </Link>
            </li>
            <li>
              <Link
                href="/industries/manufacturing"
                className="hover:underline"
              >
                Manufacturing & Warehousing
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
        © {new Date().getFullYear()} Binly. All rights reserved.
      </div>
      <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
        Proudly built in{" "}
        <a
          href="https://www.wisconsin.gov"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-600 dark:text-blue-400"
        >
          Wisconsin
        </a>
        .
      </div>
    </footer>
  );
};

export default Footer;
