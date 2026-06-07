"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  links: Array<{ href: string; label: string }>;
  onClose: () => void;
}

export default function MobileNav({ isOpen, links, onClose }: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[57px] z-40 overflow-hidden transition-all duration-300 md:hidden",
        isOpen ? "max-h-screen" : "max-h-0"
      )}
    >
      <nav className="flex flex-col gap-2 bg-brand-blue-600 px-4 py-4 pb-6 shadow-lg">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-lg px-3 py-2.5 font-semibold text-white transition-colors hover:bg-white/10"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
