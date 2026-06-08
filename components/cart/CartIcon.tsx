"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart";

interface CartIconProps {
  scrolled?: boolean;
}

export default function CartIcon({ scrolled = false }: CartIconProps) {
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openCart = useCartStore((s) => s.openCart);

  return (
    <button
      onClick={openCart}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
        scrolled ? "text-white hover:bg-white/10" : "text-[#1C1C2E] hover:bg-gray-100"
      }`}
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF5722] px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
