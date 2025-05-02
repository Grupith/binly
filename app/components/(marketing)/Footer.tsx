import React from "react";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 text-sm px-6 py-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Binly</h2>
          <p className="text-gray-600">
            Simple inventory management for homes, shops, and small teams.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Product</h3>
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
          <h3 className="font-medium text-gray-900 mb-2">Company</h3>
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
          <h3 className="font-medium text-gray-900 mb-2">Legal</h3>
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
      </div>
      <div className="mt-10 text-center text-gray-500 border-t pt-6">
        © {new Date().getFullYear()} Binly. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
