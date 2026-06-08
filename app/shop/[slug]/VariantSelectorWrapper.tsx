"use client";

import { useState, useMemo } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/cart";
import ProductVariantSelector from "@/components/product/ProductVariantSelector";
import type { WCAttribute, WCVariation } from "@/lib/types";

interface VariantSelectorWrapperProps {
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
  attributes: WCAttribute[];
  variations: WCVariation[];
}

export default function VariantSelectorWrapper({
  product,
  attributes,
  variations,
}: VariantSelectorWrapperProps) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [added, setAdded] = useState(false);

  const matchedVariation = useMemo(() => {
    const selectedEntries = Object.entries(selected).filter(([, v]) => v);
    if (selectedEntries.length === 0) return null;
    return variations.find((v) =>
      selectedEntries.every(([key, val]) =>
        v.attributes.some((a) => a.name === key && a.option === val)
      )
    ) ?? null;
  }, [selected, variations]);

  const handleAttrChange = (name: string, value: string) => {
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!matchedVariation) return;
    addItem({
      id: product.id,
      variationId: matchedVariation.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(matchedVariation.price || "0"),
      quantity,
      image: matchedVariation.image?.src || product.images?.[0]?.src || "",
      color: Object.values(selected).filter(Boolean).join(", "),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!matchedVariation) return;
    addItem({
      id: product.id,
      variationId: matchedVariation.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(matchedVariation.price || "0"),
      quantity,
      image: matchedVariation.image?.src || product.images?.[0]?.src || "",
      color: Object.values(selected).filter(Boolean).join(", "),
    });
    openCart();
  };

  return (
    <div className="space-y-4">
      <ProductVariantSelector
        attributes={attributes}
        variations={variations}
        selected={selected}
        onChange={handleAttrChange}
      />

      {matchedVariation && (
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-[#6B7280]">Selected price:</p>
          <p className="font-heading text-2xl font-bold text-[#FF5722]">
            {matchedVariation.on_sale && matchedVariation.sale_price
              ? formatPrice(matchedVariation.sale_price)
              : formatPrice(matchedVariation.price)}
          </p>
        </div>
      )}

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
        disabled={!matchedVariation || product.stock_status !== "instock"}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5722] py-3.5 font-bold text-white transition-all hover:bg-[#FF7043] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        <ShoppingCart className="w-5 h-5" />
        {!matchedVariation ? "Select Options" : added ? "Added!" : "Add to Cart"}
      </button>

      <button
        onClick={handleBuyNow}
        disabled={!matchedVariation || product.stock_status !== "instock"}
        className="flex w-full items-center justify-center rounded-xl border-2 border-[#1C1C2E] py-3.5 font-bold text-[#1C1C2E] transition-all hover:bg-[#1C1C2E] hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
      >
        Buy Now
      </button>
    </div>
  );
}
