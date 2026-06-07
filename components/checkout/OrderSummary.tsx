"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

interface OrderSummaryProps {
  items: CartItem[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 49 ? 0 : 5.99;

  return (
    <div className="rounded-xl bg-surface-light p-6">
      <h3 className="mb-4 font-heading text-lg font-bold text-ink">
        Order Summary
      </h3>

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={`${item.id}-${item.variationId ?? ""}`} className="flex gap-3">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-surface-muted">
              <Image
                src={item.image || "/images/product-placeholder.jpg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink truncate">
                {item.name}
              </p>
              {item.color && (
                <p className="text-xs text-ink-muted">{item.color}</p>
              )}
              <div className="flex justify-between text-sm text-ink-muted">
                <span>Qty: {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 border-t border-surface-muted pt-4 text-sm">
        <div className="flex justify-between text-ink-muted">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-ink-muted">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between font-bold text-ink text-base pt-2 border-t border-surface-muted">
          <span>Total</span>
          <span>{formatPrice(subtotal + shipping)}</span>
        </div>
      </div>
    </div>
  );
}
