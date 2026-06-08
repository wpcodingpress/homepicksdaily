"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { formatPrice } from "@/lib/utils";

interface SimpleProductFormProps {
  product: {
    id: number;
    name: string;
    slug: string;
    type: string;
    price: string;
    stock_status: string;
    images: Array<{ src: string }>;
    sku: string;
  };
}

export default function SimpleProductForm({ product }: SimpleProductFormProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price || "0"),
      quantity,
      image: product.images?.[0]?.src || "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price || "0"),
      quantity,
      image: product.images?.[0]?.src || "",
    });
    openCart();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-[#1C1C2E]">Quantity:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#6B7280] transition-colors hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-lg font-semibold text-[#1C1C2E]">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-[#6B7280] transition-colors hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        disabled={product.stock_status !== "instock"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5722] py-3.5 font-bold text-white transition-all hover:bg-[#FF7043] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <ShoppingCart className="w-5 h-5" />
        {added ? "Added!" : "Add to Cart"}
      </button>

      <button
        onClick={handleBuyNow}
        disabled={product.stock_status !== "instock"}
        className="flex w-full items-center justify-center rounded-xl border-2 border-[#1C1C2E] py-3.5 font-bold text-[#1C1C2E] transition-all hover:bg-[#1C1C2E] hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
      >
        Buy Now
      </button>
    </div>
  );
}
