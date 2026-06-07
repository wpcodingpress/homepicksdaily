"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { cn, formatPrice } from "@/lib/utils";
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
          className="fixed inset-0 z-50 bg-black/40"
          onClick={closeCart}
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-surface-muted px-4 py-4">
          <h2 className="font-heading text-lg font-bold text-ink">
            Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-surface-muted"
            aria-label="Close cart"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
            <svg
              className="h-16 w-16 text-ink-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
              />
            </svg>
            <p className="text-ink-muted">Your cart is empty</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="rounded-lg bg-brand-orange-500 px-5 py-2.5 font-bold text-white transition-colors hover:bg-brand-orange-600"
            >
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.variationId ?? item.id} item={item} />
                ))}
              </ul>
            </div>

            <div className="border-t border-surface-muted px-4 py-4">
              <div className="flex items-center justify-between text-lg font-bold text-ink">
                <span>Total</span>
                <span>{formatPrice(total())}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-3 flex w-full items-center justify-center rounded-lg bg-brand-orange-500 py-3 font-bold text-white transition-colors hover:bg-brand-orange-600"
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
