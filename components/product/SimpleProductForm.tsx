"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import type { WCProduct } from "@/lib/types";

interface SimpleProductFormProps {
  product: Pick<WCProduct, "id" | "name" | "slug" | "type" | "price" | "stock_status" | "images" | "sku">;
}

export default function SimpleProductForm({ product }: SimpleProductFormProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-muted text-ink-muted hover:bg-surface-muted"
        >
          -
        </button>
        <span className="w-8 text-center font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-muted text-ink-muted hover:bg-surface-muted"
        >
          +
        </button>
      </div>

      <AddToCartButton
        product={product}
        selectedVariation={null}
        selectedAttributes={{}}
        quantity={quantity}
      />
    </div>
  );
}
