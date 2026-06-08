"use client";

import { formatPrice } from "@/lib/utils";
import type { CartItem } from "@/lib/types";

interface OrderSummaryProps {
  items: CartItem[];
}

export default function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= 49 ? 0 : 5.99;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 font-heading text-lg font-bold text-[#1C1C2E]">
        Order Summary
      </h3>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={`${item.id}-${item.variationId}`} className="flex items-center justify-between text-sm">
            <div className="flex-1">
              <p className="font-medium text-[#1C1C2E] line-clamp-1">{item.name}</p>
              <p className="text-xs text-[#6B7280]">Qty: {item.quantity}</p>
            </div>
            <span className="font-semibold text-[#1C1C2E]">
              {formatPrice(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 text-sm">
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
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex justify-between text-lg font-bold text-[#1C1C2E]">
          <span>Total</span>
          <span>{formatPrice(subtotal + shipping)}</span>
        </div>
      </div>
    </div>
  );
}
