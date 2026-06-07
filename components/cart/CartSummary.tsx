"use client";

import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total);

  const subtotal = total();
  const shipping = subtotal >= 49 ? 0 : 5.99;

  return (
    <div className="rounded-xl bg-surface-light p-6">
      <h3 className="mb-4 font-heading text-lg font-bold text-ink">
        Order Summary
      </h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-ink-muted">
          <span>Subtotal ({items.length} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-ink-muted">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        {subtotal < 49 && subtotal > 0 && (
          <p className="text-xs text-ink-light">
            Add {formatPrice(49 - subtotal)} more for free shipping
          </p>
        )}
      </div>
      <div className="mt-4 border-t border-surface-muted pt-4">
        <div className="flex justify-between text-lg font-bold text-ink">
          <span>Total</span>
          <span>{formatPrice(subtotal + shipping)}</span>
        </div>
      </div>
    </div>
  );
}
