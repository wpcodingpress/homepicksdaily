"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const values = [
  {
    emoji: "\uD83C\uDF3F",
    title: "Eco-Friendly",
    description:
      "Sustainable materials and biodegradable packaging for a greener tomorrow",
  },
  {
    emoji: "\u26A1",
    title: "Fast Delivery",
    description:
      "Ships within 24 hours with worldwide tracked shipping",
  },
  {
    emoji: "\uD83D\uDD12",
    title: "Secure Payment",
    description:
      "PayPal checkout with full buyer protection on every order",
  },
  {
    emoji: "\u2B50",
    title: "Quality Guaranteed",
    description:
      "30-day satisfaction guarantee. Not happy? Full refund, no questions",
  },
];

export default function ValuePropositions() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative border-t-[3px] border-brand-orange bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((v) => (
            <div
              key={v.title}
              className="group cursor-pointer rounded-2xl bg-surface-light p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
                {v.emoji}
              </div>
              <h3 className="mt-4 font-heading text-lg font-bold text-brand-blue">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
