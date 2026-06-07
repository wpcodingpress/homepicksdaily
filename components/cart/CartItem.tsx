"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";
import type { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li className="flex gap-4">
      <Link
        href={`/shop/${item.slug}`}
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-surface-muted"
      >
        <Image
          src={item.image || "/images/product-placeholder.jpg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <Link
            href={`/shop/${item.slug}`}
            className="text-sm font-semibold text-ink line-clamp-2 hover:text-brand-orange-500"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.id, item.variationId)}
            className="flex-shrink-0 text-ink-light hover:text-error"
            aria-label="Remove item"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {item.color && (
          <p className="text-xs text-ink-muted">{item.color}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity - 1, item.variationId)
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-surface-muted text-ink-muted hover:bg-surface-muted"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-6 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.id, item.quantity + 1, item.variationId)
              }
              className="flex h-7 w-7 items-center justify-center rounded border border-surface-muted text-ink-muted hover:bg-surface-muted"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-sm font-bold text-ink">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
