"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const { items, isOpen, closeCart, total } = useCartStore();

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
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
          <h2 className="font-heading text-lg font-bold text-[#1C1C2E]">
            Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#1C1C2E]"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
            <p className="text-[#6B7280]">Your cart is empty</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-lg bg-[#FF5722] px-5 py-2.5 font-bold text-white transition-colors hover:bg-[#FF7043]"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <CartItem key={`${item.id}-${item.variationId ?? ""}`} item={item} />
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-100 px-4 py-4">
              <div className="flex items-center justify-between text-lg font-bold text-[#1C1C2E]">
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#FF5722] py-3 font-bold text-white transition-colors hover:bg-[#FF7043]"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
