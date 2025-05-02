import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Binly keeps our job site organized.",
    name: "Rachel",
    role: "Contractor",
  },
  {
    quote: "It’s the first app my dad could figure out without help.",
    name: "Sam",
    role: "Electrician",
  },
  {
    quote: "I track my whole garage with Binly. No more lost tools.",
    name: "Miguel",
    role: "Homeowner",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-100 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What people are saying
        </h2>
        <p className="text-gray-600">
          Real feedback from people using Binly at home and on the job.
        </p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow border border-gray-100 text-left flex flex-col justify-between h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="text-gray-800 italic mb-4 flex-1">“{t.quote}”</p>
            <div className="flex text-yellow-500">
              {Array.from({ length: 5 }).map((_, idx) => (
                <svg
                  key={idx}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-4 h-4"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.538 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.783.57-1.838-.196-1.538-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.174a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
