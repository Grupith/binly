"use client";
import React from "react";
import Link from "next/link";

interface Plan {
  name: string;
  monthlyPrice: number | string;
  annualPrice: number | string;
  description: string;
  features: string[];
  buttonText: string;
  highlight: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description:
      "For testing the waters, organizing the garage, or tracking your storage unit.",
    features: [
      "1 user",
      "50 unique items",
      "1 location",
      "Image uploads",
      "Item quantity tracking",
      "Basic search & filtering",
    ],
    buttonText: "Start Free",
    highlight: false,
  },
  {
    name: "Starter",
    monthlyPrice: 29,
    annualPrice: 24,
    description:
      "Built for small shops, field crews, and weekend hustles that mean business.",
    features: [
      "Everything in Free, plus:",
      "3 users",
      "500 unique items",
      "3 locations",
      "QR code scanning",
      "Basic item export (CSV)",
      "Activity log",
      "Email support",
    ],
    buttonText: "Upgrade to Starter",
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: 99,
    annualPrice: 79,
    description:
      "Made for contractors, warehouses, and teams that don’t have time to lose track.",
    features: [
      "Everything in Starter, plus:",
      "10 users",
      "5,000 unique items",
      "Unlimited locations",
      "Barcode scanning",
      "Priority support",
    ],
    buttonText: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    description:
      "For serious operations with complex needs and big expectations.",
    features: [
      "For complex operations",
      "Custom user & item limits",
      "Dedicated account manager",
      "Onboarding assistance",
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

const PricingPlans = () => {
  const [billing, setBilling] = React.useState<"monthly" | "annual">("annual");

  const getFormattedPrice = (plan: Plan) => {
    const price = billing === "monthly" ? plan.monthlyPrice : plan.annualPrice;
    if (price === "Custom")
      return <span className="text-4xl font-bold">Custom</span>;
    return (
      <span className="inline-flex items-baseline gap-1">
        <span className="text-5xl font-bold text-gray-900 dark:text-white">
          ${price}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
      </span>
    );
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-0 py-12 bg-gradient-to-br from-sky-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4"
    >
      <div className="max-w-6xl mx-auto text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Pricing Plans
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Start organizing. Upgrade when it&apos;s time to get serious.
        </p>
        {/* Billing toggle for monthly/annual */}
        <div className="flex flex-col items-center justify-center mt-4 gap-1">
          <div className="flex items-center gap-3">
            <span
              className={`text-sm font-medium ${
                billing === "monthly"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBilling(billing === "monthly" ? "annual" : "monthly")
              }
              className={`relative cursor-pointer inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
                billing === "annual" ? "bg-sky-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`transform transition-transform duration-300 inline-block w-4 h-4 bg-white rounded-full ${
                  billing === "annual" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billing === "annual"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-400"
              }`}
            >
              Annual
            </span>
          </div>
          <span className="text-sm text-sky-600 font-medium mt-2">
            Save 20% with annual billing — that&apos;s 2 months free!
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative border rounded-2xl p-6 flex flex-col transition-shadow ${
              plan.highlight
                ? "border-sky-500 shadow-lg bg-sky-50 dark:bg-gray-800"
                : "border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800"
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {plan.name}
            </h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {getFormattedPrice(plan)}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {plan.description}
            </p>
            <ul className="text-left text-sm text-gray-700 dark:text-gray-300 space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={feature} className={index < 3 ? "font-semibold" : ""}>
                  {" "}
                  ✔️ {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className={`mt-auto inline-block text-center px-4 py-2 rounded-md font-medium ${
                plan.highlight
                  ? "bg-sky-600 text-white hover:bg-sky-700"
                  : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingPlans;
