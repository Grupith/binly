"use client";

import React from "react";
import Footer from "../../components/(marketing)/Footer";

const TermsPage = () => {
  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-20 text-gray-800 dark:text-gray-300">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Terms of Service
        </h1>

        <p className="mb-4 text-sm text-gray-500">Last updated: May 2, 2025</p>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Binly, you agree to be bound by these Terms of
            Service. If you do not agree to these terms, please do not use our
            service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">2. Use of the Service</h2>
          <p>
            You may use Binly only for lawful purposes and in accordance with
            these Terms. You are responsible for maintaining the confidentiality
            of your account and password and for restricting access to your
            device.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">3. Subscription Plans</h2>
          <p>
            Binly offers free and paid subscription tiers. By subscribing to a
            paid plan, you authorize us to charge the applicable fees.
            Subscription fees are non-refundable unless required by law.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p>
            All content, branding, and features on Binly are the property of
            Binly or its licensors. You may not copy, distribute, or reproduce
            any part of the service without permission.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            service at any time, with or without cause or notice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>
            Binly reserves the right to update these Terms at any time. We will
            notify users by updating the &apos;Last Updated&apos; date at the
            top of this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
          <p>
            If you have any questions about these Terms, you can contact us at{" "}
            <a
              href="mailto:support@binlyinventory.com"
              className="text-sky-600 underline"
            >
              binlyinventory@gmail.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsPage;
