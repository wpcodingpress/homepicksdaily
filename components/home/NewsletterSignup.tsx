"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-brand-blue-500 py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white">
          Stay in the Loop
        </h2>
        <p className="mt-2 text-white/70">
          Get eco-friendly tips, new arrivals, and exclusive offers.
        </p>
        {submitted ? (
          <p className="mt-6 text-lg font-semibold text-brand-orange-400">
            Thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-lg border-0 px-4 py-3 text-ink placeholder:text-ink-light focus:ring-2 focus:ring-brand-orange-500"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-orange-500 px-6 py-3 font-bold text-white transition-colors hover:bg-brand-orange-600"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
