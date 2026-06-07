"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    name: "Sarah M.",
    text: "These products have completely transformed my cleaning routine. Effective, planet-friendly, and beautifully packaged. Will never go back to regular brands!",
  },
  {
    name: "James K.",
    text: "Fast shipping, great quality. The kitchen organizers are exactly what I needed. Eco-friendly packaging was a bonus!",
  },
  {
    name: "Priya R.",
    text: "Absolutely love the refillable bottles. Saves money and reduces plastic. HomePicksDaily is now my go-to store.",
  },
  {
    name: "Mike T.",
    text: "Ordered for the first time last month, already placed 3 more orders. Quality is unmatched at this price point.",
  },
  {
    name: "Emma L.",
    text: "The 30-day guarantee gave me confidence to try. I'm so glad I did \u2014 every product exceeded my expectations.",
  },
];

export default function Testimonials() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,37,64,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-brand-orange">
            Testimonials
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-blue sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div
          ref={ref}
          className="reveal flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {testimonials.concat(testimonials).map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="min-w-[300px] flex-shrink-0 snap-center sm:min-w-[340px] lg:min-w-[380px]"
            >
              <div className="h-full rounded-2xl border border-[rgba(10,37,64,0.08)] bg-white p-6 shadow-[0_4px_24px_rgba(10,37,64,0.08)]">
                <div className="mb-3 flex gap-1 text-brand-orange">
                  {"\u2B50\u2B50\u2B50\u2B50\u2B50"}
                </div>
                <p className="text-sm leading-relaxed text-ink italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-success">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
