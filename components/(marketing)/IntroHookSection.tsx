"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const IntroHookSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100"
          >
            How it works
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            How Binly Works
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how Binly helps you organize, track, and manage inventory in
            just a few simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {[
            {
              icon: "🧾",
              title: "Add",
              description: "Name, tag, and photo every item you want to track.",
              step: "01",
            },
            {
              icon: "📍",
              title: "Place",
              description:
                "Assign items to shelves, rooms, bins, or containers.",
              step: "02",
            },
            {
              icon: "📲",
              title: "Scan",
              description:
                "View or move inventory instantly with a quick QR scan.",
              step: "03",
            },
            {
              icon: "🔁",
              title: "Track",
              description:
                "Check items in and out, assign to people, and keep history.",
              step: "04",
            },
          ].map((item) => (
            <Card
              key={item.title}
              className="relative group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardContent className="p-8 text-center h-full flex flex-col">
                {/* Step number */}
                <div className="absolute top-4 right-4 text-xs font-mono text-muted-foreground">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link href="/login">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Try it Free, No Credit Card Required
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">
            Join thousands of organized teams worldwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroHookSection;
