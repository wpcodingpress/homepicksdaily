"use client";

import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);

  const subtotal = total();
  const shipping = subtotal >= 49 ? 0 : 5.99;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 font-heading text-lg font-bold text-[#0F1923]">
        Order Summary
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-[#6B7280]">
          <span>Subtotal ({items.length} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#6B7280]">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-[#4CAF50]">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {subtotal < 49 && subtotal > 0 && (
          <p className="text-xs text-[#6B7280]">
            Add {formatPrice(49 - subtotal)} more for free shipping
          </p>
        )}
      </div>
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-lg font-bold text-[#0F1923]">
          <span>Total</span>
          <span>{formatPrice(subtotal + shipping)}</span>
        </div>
      </div>
    </div>
  );
}
