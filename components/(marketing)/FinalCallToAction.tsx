import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const FinalCallToAction = () => {
  return (
    <section className="bg-sky-100 dark:bg-gray-800 text-gray-900 dark:text-white py-20 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Get started for free — organize your space in minutes.
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          No credit card required. No training needed. Just sign up and start
        </p>
        <Link href="/get-started">
          <Button variant="default" className="mt-8 cursor-pointer px-10 py-6">
            Try it now!
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default FinalCallToAction;
