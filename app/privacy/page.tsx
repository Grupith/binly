"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last updated: May 2, 2025</p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
        <p>
          This Privacy Policy explains how Binly collects, uses, and protects
          your personal information when you use our services. By using Binly,
          you agree to the terms outlined in this policy.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">
          2. Information We Collect
        </h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Your name and email address when you create an account</li>
          <li>Inventory and usage data you input into the app</li>
          <li>Payment information when you subscribe to a paid plan</li>
          <li>Device and usage information (browser, IP address, etc.)</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">3. How We Use Your Data</h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Provide and maintain your Binly account</li>
          <li>Improve the features and performance of our service</li>
          <li>Send updates and support communications</li>
          <li>Process subscription payments</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
        <p>
          We do not sell or share your personal information with third parties
          except:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>
            With service providers (e.g., payment processors, email tools)
          </li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights or the safety of others</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
        <p>
          We implement industry-standard security practices to protect your
          data, including encryption, access control, and secure infrastructure.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <p>You may:</p>
        <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
          <li>Access or update your personal information</li>
          <li>Request deletion of your data</li>
          <li>Unsubscribe from marketing communications</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">
          7. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We’ll notify
          users by updating the “Last Updated” date at the top of this page.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please
          contact us at{" "}
          <a
            href="mailto:support@binlyinventory.com"
            className="text-sky-600 underline"
          >
            support@binlyinventory.com
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
