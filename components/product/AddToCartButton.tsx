"use client";

import { useCartStore } from "@/lib/cart";
import { cn } from "@/lib/utils";
import type { WCProduct, WCVariation } from "@/lib/types";

interface AddToCartButtonProps {
  product: Pick<WCProduct, "id" | "name" | "slug" | "type" | "price" | "stock_status" | "images" | "sku">;
  selectedVariation: WCVariation | null;
  selectedAttributes: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedVariation,
  selectedAttributes,
  quantity,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const isVariable = product.type === "variable";
  const isOutOfStock = product.stock_status === "outofstock";
  const canAdd = !isOutOfStock && (!isVariable || selectedVariation !== null);

  const handleAdd = () => {
    if (!canAdd) return;

    const variation = selectedVariation;
    const item = {
      id: product.id,
      variationId: variation?.id,
      name: product.name,
      slug: product.slug,
      price: variation
        ? parseFloat(variation.price || "0")
        : parseFloat(product.price || "0"),
      quantity,
      image: (variation?.image ?? product.images?.[0])?.src ?? "/images/product-placeholder.jpg",
      color: selectedAttributes["Color"] || undefined,
      sku: variation?.sku || product.sku,
    };

    addItem(item);
    openCart();
  };

  return (
    <button
      onClick={handleAdd}
      disabled={!canAdd}
      className={cn(
        "w-full rounded-lg py-3.5 text-base font-bold text-white transition-colors",
        canAdd
          ? "bg-brand-orange-500 hover:bg-brand-orange-600"
          : "bg-ink-light cursor-not-allowed"
      )}
    >
      {isOutOfStock
        ? "Out of Stock"
        : isVariable && !selectedVariation
          ? "Select Options"
          : "Add to Cart"}
    </button>
  );
}
