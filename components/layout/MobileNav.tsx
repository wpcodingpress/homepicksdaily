"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  links: Array<{ href: string; label: string }>;
  onClose: () => void;
}

export default function MobileNav({ isOpen, links, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#1C1C2E] shadow-2xl transition-transform duration-350 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col px-6 py-8">
          <div className="flex items-center justify-between">
            <span className="font-heading text-xl font-bold">
              <span className="text-[#FF5722]">Home</span>
              <span className="text-[#00BCD4]">Picks</span>
              <span className="text-white">Daily</span>
            </span>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-12 flex flex-1 flex-col gap-2">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="rounded-lg px-4 py-3.5 font-heading text-2xl font-bold text-white transition-all hover:bg-white/10 hover:text-[#FF5722]"
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF5722] px-4 py-3.5 font-bold text-white transition-colors hover:bg-[#FF7043]"
            >
              <ShoppingCart className="w-5 h-5" />
              View Cart
            </Link>
            <div className="flex justify-center gap-4 text-sm text-white/50">
              <span className="transition-colors hover:text-white">Facebook</span>
              <span className="transition-colors hover:text-white">Instagram</span>
              <span className="transition-colors hover:text-white">Pinterest</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
