"use client";

import Image from "next/image";
import Link from "next/link";
import construction from "@/public/images/404-construction.svg";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center bg-sky-50 text-gray-800">
      <div className="mb-8">
        <h2 className="sr-only">Construction site illustration</h2>
        <Image
          src={construction}
          alt="Construction site illustration"
          width={600}
          height={600}
        />
        <a href="https://storyset.com/work" className="text-xs text-gray-500">
          Work illustrations by Storyset
        </a>
      </div>
      <h1 className="text-5xl font-bold mb-4">Under Construction 🏗️</h1>
      <p className="text-lg mb-6">
        Uh oh! You weren’t supposed to see inside this bin.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block bg-sky-600 text-white px-6 py-3 rounded-md font-medium hover:bg-sky-700 transition"
      >
        Back to Safety
      </Link>
    </main>
  );
}
