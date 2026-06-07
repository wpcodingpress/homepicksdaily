"use client";

import Link from "next/link";

interface MobileNavProps {
  isOpen: boolean;
  links: Array<{ href: string; label: string }>;
  onClose: () => void;
}

export default function MobileNav({ isOpen, links, onClose }: MobileNavProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-brand-blue shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-6 py-8">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xl font-bold text-white">
              Home<span className="text-brand-orange">Picks</span>Daily
            </span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="mt-12 flex flex-1 flex-col gap-2">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="nav-link rounded-lg px-4 py-3.5 font-heading text-2xl font-bold text-white transition-all hover:bg-white/10 hover:text-brand-orange"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.3s ease ${0.1 + i * 0.08}s, transform 0.3s ease ${0.1 + i * 0.08}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-4">
            <Link
              href="/cart"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg bg-brand-orange px-4 py-3.5 font-bold text-white transition-colors hover:bg-brand-orange-light"
            >
              View Cart
            </Link>
            <div className="flex justify-center gap-4">
              {["Facebook", "Instagram", "Pinterest"].map((social) => (
                <span
                  key={social}
                  className="text-sm text-white/50 transition-colors hover:text-white"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
