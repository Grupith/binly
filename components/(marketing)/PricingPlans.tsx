"use client";
import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

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
      "Made for contractors, warehouses, and teams that don't have time to lose track.",
    features: [
      "10 users",
      "5,000 unique items",
      "Unlimited locations",
      "Barcode scanning",
      "Import items (CSV)",
      "Advanced search & filtering",
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
      return (
        <span className="text-4xl md:text-5xl font-bold tracking-tight">
          Custom
        </span>
      );
    return (
      <span className="inline-flex items-baseline gap-1">
        <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          ${price}
        </span>
        <span className="text-base text-gray-500 dark:text-gray-400 font-medium">
          /mo
        </span>
      </span>
    );
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-0 py-24 bg-gradient-to-b from-background to-muted/20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Pricing Plans
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start organizing. Upgrade when it&apos;s time to get serious.
          </p>

          {/* Billing toggle for monthly/annual */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-4 p-1 bg-muted rounded-lg">
              <span
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  billing === "monthly"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() =>
                  setBilling(billing === "monthly" ? "annual" : "monthly")
                }
                className={`relative cursor-pointer inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
                  billing === "annual" ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`transform transition-transform duration-300 inline-block w-4 h-4 bg-white rounded-full shadow ${
                    billing === "annual" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  billing === "annual"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                Annual
              </span>
            </div>
            <span className="text-sm text-primary font-medium">
              Save 20% with annual billing — that&apos;s 2 months free!
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative border-2 rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-lg ${
                plan.highlight
                  ? "border-primary shadow-lg bg-primary/5 scale-105"
                  : "border-border hover:border-primary/20 bg-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold tracking-tight mb-4">
                  {plan.name}
                </h3>
                <div className="mb-4">{getFormattedPrice(plan)}</div>
                <p className="text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, index) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span
                      className={`text-sm leading-relaxed ${
                        index < 3 ? "font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/login"
                className={`mt-auto inline-block text-center px-6 py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
                    : "border-2 border-border text-foreground hover:bg-muted hover:border-primary/20"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
