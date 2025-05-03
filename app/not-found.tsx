"use client";

import Image from "next/image";
import Link from "next/link";
import construction from "@/public/images/404-construction.svg";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-20 bg-sky-50 dark:bg-gray-900 text-center">
      <div className="max-w-xl w-full flex flex-col items-center">
        <Image
          src={construction}
          alt="Under construction illustration"
          width={500}
          height={500}
          className="mb-6"
        />
        <a
          href="https://storyset.com/work"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 dark:text-gray-400 mb-8"
        >
          Work illustrations by Storyset
        </a>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Under Construction 🏗️
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Uh oh! You weren’t supposed to see inside this bin.
        </p>
        <Link
          href="/"
          className="inline-block bg-sky-600 text-white px-6 py-3 rounded-md font-medium hover:bg-sky-700 transition-colors"
        >
          Back to Safety
        </Link>
      </div>
    </main>
  );
}
