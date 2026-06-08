"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
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
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100"
      >
        <Image
          src={item.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80&auto=format&fit=crop"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-2">
          <Link
            href={`/shop/${item.slug}`}
            className="text-sm font-semibold text-[#1C1C2E] line-clamp-1 hover:text-[#FF5722]"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.id, item.variationId)}
            className="flex-shrink-0 text-gray-400 transition-colors hover:text-red-500"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {item.color && (
          <p className="text-xs text-[#6B7280]">{item.color}</p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1, item.variationId)}
              className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1, item.variationId)}
              className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="text-sm font-bold text-[#1C1C2E]">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
