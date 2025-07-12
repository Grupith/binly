"use client";

import React from "react";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 px-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Contact Us
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Have a question, feedback, or need help? Reach out and we&apos;ll get
          back to you within 1-2 business days.
        </p>
      </div>
      <form className="max-w-3xl mx-auto grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <textarea
          rows={5}
          placeholder="Your Message"
          className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        ></textarea>
        <button
          type="submit"
          className="bg-sky-600 text-white px-6 py-3 rounded-md font-medium hover:bg-sky-700 transition-colors w-full sm:w-auto"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default ContactSection;
