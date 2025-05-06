import Link from "next/link";
import React from "react";

const plans = [
  {
    name: "Free",
    price: "$0/mo",
    description:
      "Track your tools or supplies in one garage, shop, or storage room — free forever.",
    features: [
      "150 Items",
      "1 Workspace",
      "Add 1 Member",
      "Qr Code Scanning",
      "Basic Tagging & Search",
      "1 Photo per Item",
      "No CSV export",
    ],
    buttonText: "Start Free",
    highlight: false,
  },
  {
    name: "Pro (Personal)",
    price: "$7/mo",
    description:
      "Ideal for personal projects, small teams, or solo business owners tracking inventory across a couple of spaces.",
    features: [
      "1,500 Items",
      "2 Workspaces",
      "Add up to 3 Members",
      "Import from CSV",
      "Export from CSV",
      "Barcode Scanning",
      "Up to 3 Photos per Item (5MB max)",
      "Simple user roles (Owner/Viewer)",
      "Basic Check In/Out",
    ],
    buttonText: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Small Business",
    price: "$49/mo",
    description:
      "Designed for trades, coffee shops, and small teams — with smart tools to track inventory, reduce mistakes, and save time every day.",
    features: [
      "10,000 Items",
      "10 Workspaces",
      "Add 10 Members",
      "Role-based access (Owner, Manager, Staff)",
      "Check In/Out System",
      "Pick Lists",
      "Low Stock Alerts",
      "Usage Logs",
      "Priority Support Access",
      "Printable Pick Lists",
    ],
    buttonText: "Get Small Biz",
    highlight: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description:
      "Contact us for custom setups, large teams, or specialized inventory needs.",
    features: [
      "Unlimited Items",
      "Unlimited Workspaces",
      "Unlimited Users",
      "Dedicated Onboarding & Setup Support",
      "Custom Features or Integrations",
      "Advanced Reporting",
      "Priority Support",
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

const PricingPlans = () => {
  const formatPrice = (price: string) => {
    if (price === "Custom")
      return <span className="text-4xl font-bold">Custom</span>;

    const [amount, suffix] = price.split("/");
    return (
      <span className="inline-flex items-baseline gap-1">
        <span className="text-5xl font-bold text-gray-900 dark:text-white">
          {amount}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          /{suffix}
        </span>
      </span>
    );
  };

  return (
    <section id="pricing" className="py-12 bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pricing Plans
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Always free to start. Upgrade only when you&apos;re ready.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative cursor-pointer border rounded-2xl p-6 flex flex-col transition-shadow ${
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
              {formatPrice(plan.price)}
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
