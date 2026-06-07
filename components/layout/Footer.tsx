"use client";

import { useState } from "react";
import Link from "next/link";

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?orderby=date", label: "New Arrivals" },
  { href: "/shop?orderby=popularity", label: "Bestsellers" },
  { href: "/shop?on_sale=true", label: "Sale" },
];

const infoLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/return-policy", label: "Return Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setEmail("");
  };

  return (
    <footer className="bg-brand-blue">
      <div className="border-t-[3px] border-brand-orange" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-heading text-xl font-bold text-white">
              Home<span className="text-brand-orange">Picks</span>Daily
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Eco-friendly home essentials for a cleaner, greener planet.
            </p>
            <div className="mt-5 flex gap-3">
              {["Facebook", "Instagram", "Pinterest", "Twitter"].map(
                (social) => (
                  <span
                    key={social}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xs text-white/70 transition-colors hover:bg-brand-orange hover:text-white"
                  >
                    {social.charAt(0)}
                  </span>
                )
              )}
            </div>
            <div className="mt-5 flex gap-2 text-xs text-white/40">
              <span className="rounded bg-white/5 px-2 py-1">PayPal</span>
              <span className="rounded bg-white/5 px-2 py-1">SSL Secure</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">
              Information
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-sm font-bold text-white">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@homepicksdaily.com
              </p>
              <p className="flex items-center gap-2">
                <svg className="h-4 w-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mon\u2013Fri, 9am\u20136pm EST
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 rounded-l-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-r-lg bg-brand-orange text-white transition-colors hover:bg-brand-orange-light"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-blue-mid">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} HomePicksDaily. All rights
            reserved.
          </p>
          <div className="flex gap-3 text-xs text-white/40">
            <span className="rounded bg-white/5 px-2 py-1">PayPal Accepted</span>
            <span className="rounded bg-white/5 px-2 py-1">Eco Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
