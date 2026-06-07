"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPageClient() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <svg
          className="mx-auto h-20 w-20 text-ink-light"
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
        <h1 className="mt-6 font-heading text-2xl font-bold text-ink">
          Your cart is empty
        </h1>
        <p className="mt-2 text-ink-muted">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-lg bg-brand-orange-500 px-8 py-3 font-bold text-white transition-colors hover:bg-brand-orange-600"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-heading text-3xl font-bold text-ink">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-surface-muted">
            {items.map((item) => (
              <li key={`${item.id}-${item.variationId ?? ""}`} className="py-4">
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              href="/shop"
              className="text-sm font-semibold text-brand-orange-500 hover:text-brand-orange-600"
            >
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        <div>
          <CartSummary />
          <Link
            href="/checkout"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-brand-orange-500 py-3 font-bold text-white transition-colors hover:bg-brand-orange-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
