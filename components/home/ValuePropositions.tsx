"use client";

import { Leaf, Truck, Shield, Award, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "100% Eco-Friendly",
    description: "Every product meets our strict sustainability standards",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Express Delivery",
    description: "Same-day dispatch. Tracked worldwide with full insurance",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Buyer Protection",
    description: "Shop with PayPal. Full purchase protection on every order",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Quality Promise",
    description: "30-day no-questions guarantee. We stand by every product",
  },
];

export default function ValuePropositions() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="group cursor-pointer rounded-2xl bg-[#FAFAFA] p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#00BCD4]/10 text-[#00BCD4] transition-all duration-300 group-hover:bg-[#FF5722] group-hover:text-white">
                {v.icon}
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-[#1C1C2E]">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                {v.description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#FF5722] opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
