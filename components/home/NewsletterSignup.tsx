"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section
      className="relative py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(105deg, #0A2540 50%, #FF6B00 50%)",
      }}
    >
      <div
        ref={ref}
        className="reveal mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8"
      >
        <div className="mb-4 text-5xl">{"\U0001F4E7"}</div>

        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Join 10,000+ Happy Homes
        </h2>
        <p className="mt-3 text-white/80">
          Get exclusive deals, eco tips, and new arrivals every week.
        </p>

        {submitted ? (
          <p className="mt-8 text-lg font-semibold text-brand-orange">
            Thanks for subscribing! Check your inbox.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border-0 px-5 py-3.5 text-sm text-ink placeholder:text-ink-light outline-none ring-1 ring-white/20 transition-all focus:ring-2 focus:ring-brand-orange"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-orange-light hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]"
            >
              Subscribe {"\u2192"}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/60">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
