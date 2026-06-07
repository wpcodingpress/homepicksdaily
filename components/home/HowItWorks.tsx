"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    emoji: "\U0001F50D",
    title: "Browse & Choose",
    description:
      "Explore 500+ curated eco-friendly home products for every room",
  },
  {
    number: "02",
    emoji: "\U0001F6D2",
    title: "Add & Checkout",
    description:
      "Secure PayPal checkout in under 60 seconds — no account needed",
  },
  {
    number: "03",
    emoji: "\U0001F4E6",
    title: "Delivered Fast",
    description:
      "Tracked worldwide shipping straight to your door",
  },
];

export default function HowItWorks() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-surface-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-brand-orange">
            How It Works
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-blue sm:text-4xl">
            Three Simple Steps
          </h2>
          <p className="mt-3 text-ink-muted">
            Getting started is easy
          </p>
        </div>

        <div
          ref={ref}
          className="reveal relative grid gap-8 md:grid-cols-3"
        >
          <div className="absolute left-[16%] right-[16%] top-9 hidden border-t-2 border-dashed border-brand-orange/30 md:block" />

          {steps.map((s, i) => (
            <div key={s.number} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 animate-[pulse-ring_2s_ease-in-out_infinite] items-center justify-center rounded-full bg-brand-orange">
                <span className="font-heading text-xl font-bold text-white">
                  {s.number}
                </span>
              </div>

              <div className="mt-6 text-3xl">{s.emoji}</div>

              <h3 className="mt-3 font-heading text-xl font-bold text-brand-blue">
                {s.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-muted">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
