"use client";

import { useCartStore } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface CartIconProps {
  scrolled?: boolean;
}

export default function CartIcon({ scrolled = false }: CartIconProps) {
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);

  return (
    <button
      onClick={openCart}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
        scrolled
          ? "text-white hover:bg-white/10"
          : "text-brand-blue hover:bg-surface-light"
      )}
      aria-label="Open cart"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
