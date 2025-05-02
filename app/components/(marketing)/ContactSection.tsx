"use client";

import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600">
          Have a question, feedback, or need help? Reach out and we’ll get back
          to you within 1–2 business days.
        </p>
      </div>
      <form className="max-w-3xl mx-auto grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <textarea
          rows={5}
          placeholder="Your Message"
          className="w-full border rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
