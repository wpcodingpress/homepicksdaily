"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Mail, ArrowRight } from "lucide-react";

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?orderby=date", label: "New Arrivals" },
  { href: "/shop?orderby=popularity", label: "Bestsellers" },
  { href: "/shop?on_sale=true", label: "Sale Items" },
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
    <footer className="bg-[#1C1C2E]">
      <div className="border-t-[3px] border-[#FF5722]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-heading text-xl font-bold">
              <span className="text-[#FF5722]">Home</span>
              <span className="text-[#00BCD4]">Picks</span>
              <span className="text-white">Daily</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Eco-friendly home essentials for a cleaner, greener planet.
            </p>
            <div className="mt-5 flex gap-3">
              {["Facebook", "Instagram", "Pinterest", "Twitter"].map((social) => (
                <span
                  key={social}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xs text-white/70 transition-colors hover:bg-[#00BCD4] hover:text-white"
                >
                  {social.charAt(0)}
                </span>
              ))}
            </div>
            <div className="mt-5 flex gap-2 text-xs text-white/40">
              <span className="rounded bg-white/5 px-2 py-1">PayPal</span>
              <span className="rounded bg-white/5 px-2 py-1">SSL Secure</span>
              <span className="rounded bg-white/5 px-2 py-1">Eco Certified</span>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-base font-bold text-white">Shop</h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-white/60 transition-all hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-base font-bold text-white">Information</h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-white/60 transition-all hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-heading text-base font-bold text-white">Get in Touch</h3>
            <div className="space-y-3 text-sm text-white/60">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FF5722]" />
                support@homepicksdaily.com
              </p>
              <p className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center text-[#FF5722]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                Mon–Fri, 9am–6pm EST
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 rounded-l-lg bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-[#FF5722]"
              />
              <button
                type="submit"
                className="flex h-[42px] w-[42px] items-center justify-center rounded-r-lg bg-[#FF5722] text-white transition-colors hover:bg-[#FF7043]"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} HomePicksDaily. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-white/40">
            Made with <Heart className="w-3 h-3 text-[#FF5722]" /> for a greener planet
          </p>
        </div>
      </div>
    </footer>
  );
}
