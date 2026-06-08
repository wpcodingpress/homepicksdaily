"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/cart";

interface AddToCartButtonProps {
  productId: number;
  variationId?: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  color?: string;
  sku?: string;
  stockStatus: string;
}

export default function AddToCartButton({
  productId,
  variationId,
  name,
  slug,
  price,
  image,
  color,
  stockStatus,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem({
      id: productId,
      variationId,
      name,
      slug,
      price,
      quantity: 1,
      image,
      color,
    });
    setAdded(true);
    setTimeout(() => {
      openCart();
      setAdded(false);
    }, 500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={stockStatus !== "instock"}
      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white transition-all ${
        stockStatus === "instock"
          ? "bg-[#FF5722] hover:bg-[#FF7043]"
          : "cursor-not-allowed bg-gray-400"
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {added ? "Added!" : stockStatus === "instock" ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
