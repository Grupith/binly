import React from "react";
import Link from "next/link";

const FinalCallToAction = () => {
  return (
    <section className="bg-sky-100 dark:bg-gray-800 text-gray-900 dark:text-white py-20 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Get started for free — organize your space in minutes.
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          No credit card required. No training needed. Just sign up and start
        </p>
        <Link
          href="/get-started"
          className="inline-block bg-sky-200 dark:bg-sky-700 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-sky-300 dark:hover:bg-sky-600 transition-colors"
        >
          Start Free Today
        </Link>
      </div>
    </section>
  );
};

export default FinalCallToAction;
