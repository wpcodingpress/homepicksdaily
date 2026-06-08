"use client";

import Link from "next/link";
import { ShoppingCart, ArrowLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPageClient() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.total)();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <ShoppingCart className="mx-auto h-20 w-20 text-gray-300" />
        <h1 className="mt-6 font-heading text-2xl font-bold text-[#1C1C2E]">
          Your cart is empty
        </h1>
        <p className="mt-2 text-[#6B7280]">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-lg bg-[#FF5722] px-8 py-3 font-bold text-white transition-colors hover:bg-[#FF7043]"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2 text-sm text-[#6B7280]">
        <Link href="/" className="transition-colors hover:text-[#1C1C2E]">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[#1C1C2E]">Cart</span>
      </div>

      <h1 className="mb-8 font-heading text-3xl font-bold text-[#1C1C2E]">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={`${item.id}-${item.variationId ?? ""}`} className="py-4">
                <CartItem item={item} />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF5722] transition-colors hover:text-[#FF7043]"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <CartSummary />
          <Link
            href="/checkout"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF5722] py-3 font-bold text-white transition-colors hover:bg-[#FF7043]"
          >
            <ShoppingCart className="w-5 h-5" />
            Proceed to Checkout
          </Link>
          <Link
            href="/shop"
            className="block text-center text-sm font-medium text-[#00BCD4] transition-colors hover:text-[#0097A7]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
