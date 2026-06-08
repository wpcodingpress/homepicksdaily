"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
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
    <section className="relative overflow-hidden bg-[#1C1C2E] py-16 sm:py-20">
      <div
        className="pointer-events-none absolute -right-[100px] -top-[100px] h-[400px] w-[400px] rounded-full opacity-10 blur-[60px]"
        style={{ background: "#00BCD4" }}
      />
      <div
        className="pointer-events-none absolute -bottom-[100px] -left-[100px] h-[400px] w-[400px] rounded-full opacity-10 blur-[60px]"
        style={{ background: "#FF5722" }}
      />

      <div ref={ref} className="reveal relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mb-4 flex justify-center">
          <Mail className="h-12 w-12 text-[#FF5722]" />
        </div>

        <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Join 10,000+ Happy Homes
        </h2>
        <p className="mt-3 text-white/60">
          Weekly deals, eco tips, and new arrivals. Zero spam.
        </p>

        {submitted ? (
          <p className="mt-8 text-lg font-semibold text-[#FF5722]">
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
              className="flex-1 rounded-lg border-0 px-5 py-3.5 text-sm text-[#1C1C2E] placeholder:text-gray-400 outline-none ring-1 ring-white/20 transition-all focus:ring-2 focus:ring-[#FF5722]"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#FF5722] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#FF7043] hover:shadow-[0_0_20px_rgba(255,87,34,0.4)]"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-white/30">
          By subscribing you agree to our Privacy Policy
        </p>
      </div>
    </section>
  );
}
