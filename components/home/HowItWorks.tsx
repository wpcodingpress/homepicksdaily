"use client";

import { Search, ShoppingCart, Package } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    icon: <Search className="w-8 h-8" />,
    title: "Discover",
    description: "Browse 500+ curated eco-friendly home products",
  },
  {
    number: "02",
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "Order",
    description: "Add to cart, checkout securely via PayPal in 60 seconds",
  },
  {
    number: "03",
    icon: <Package className="w-8 h-8" />,
    title: "Delivered",
    description: "Fast tracked worldwide shipping straight to your door",
  },
];

export default function HowItWorks() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#00BCD4]">
            How It Works
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#1C1C2E] sm:text-4xl">
            Three Simple Steps
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Getting started is easy
          </p>
        </div>

        <div ref={ref} className="reveal relative grid gap-8 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-9 hidden border-t-2 border-dashed border-[#FF5722] opacity-40 md:block" />

          {steps.map((s, i) => (
            <div key={s.number} className="relative text-center">
              <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#FF5722] text-white">
                <span className="font-heading text-2xl font-black">
                  {s.number}
                </span>
              </div>

              <div className="mt-4 flex justify-center text-[#00BCD4]">
                {s.icon}
              </div>

              <h3 className="mt-3 font-heading text-xl font-bold text-[#1C1C2E]">
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-[#6B7280]">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
