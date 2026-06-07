"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/components/cart/CartIcon";
import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/category/home-garden", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const linkClass = (scrolled: boolean) =>
    `relative text-sm font-medium font-body transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-orange after:transition-all after:duration-300 hover:after:w-full ${
      scrolled ? "text-white hover:text-brand-orange" : "text-brand-blue hover:text-brand-orange"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-brand-blue shadow-[0_4px_24px_rgba(10,37,64,0.12)]"
            : "bg-white border-b border-[rgba(10,37,64,0.08)]"
        }`}
      >
        <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
          <Link href="/" className="flex items-center gap-1">
            <span
              className={`font-heading text-xl font-bold tracking-tight transition-colors duration-300 sm:text-[22px] ${
                scrolled ? "text-white" : "text-brand-blue"
              }`}
            >
              Home<span className="text-brand-orange">Picks</span>Daily
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(scrolled)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                scrolled
                  ? "text-white hover:bg-white/10"
                  : "text-brand-blue hover:bg-surface-light"
              }`}
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <CartIcon scrolled={scrolled} />

            <button
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
                scrolled
                  ? "text-white hover:bg-white/10"
                  : "text-brand-blue hover:bg-surface-light"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative h-5 w-5">
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded bg-current transition-all duration-300 ${
                    mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded bg-current transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[2px] w-full rounded bg-current transition-all duration-300 ${
                    mobileOpen
                      ? "top-1/2 -translate-y-1/2 -rotate-45"
                      : "bottom-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen ? "max-h-16 border-t border-[rgba(10,37,64,0.08)]" : "max-h-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <svg
                className={`h-5 w-5 flex-shrink-0 ${
                  scrolled ? "text-white/60" : "text-ink-light"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className={`flex-1 border-0 bg-transparent text-sm outline-none placeholder:text-sm ${
                  scrolled
                    ? "text-white placeholder:text-white/50"
                    : "text-ink placeholder:text-ink-light"
                }`}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className={`text-sm font-medium ${
                  scrolled ? "text-white/70 hover:text-white" : "text-ink-muted hover:text-ink"
                }`}
              >
                ESC
              </button>
            </form>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={mobileOpen}
        links={navLinks}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
