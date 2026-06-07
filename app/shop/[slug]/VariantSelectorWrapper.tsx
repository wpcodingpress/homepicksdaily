"use client";

import { useState, useMemo } from "react";
import ProductVariantSelector from "@/components/product/ProductVariantSelector";
import AddToCartButton from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import type { WCAttribute, WCVariation, WCProduct } from "@/lib/types";

interface VariantSelectorWrapperProps {
  product: Pick<WCProduct, "id" | "name" | "slug" | "type" | "price" | "stock_status" | "images" | "sku">;
  attributes: WCAttribute[];
  variations: WCVariation[];
}

export default function VariantSelectorWrapper({
  product,
  attributes,
  variations,
}: VariantSelectorWrapperProps) {
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);

  const handleAttributeChange = (name: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [name]: value === prev[name] ? "" : value,
    }));
  };

  const selectedVariation = useMemo(() => {
    const selectedEntries = Object.entries(selectedAttributes).filter(
      ([_, v]) => v
    );
    if (selectedEntries.length === 0) return null;

    return (
      variations.find((v) =>
        selectedEntries.every(([name, value]) =>
          v.attributes.some((a) => a.name === name && a.option === value)
        )
      ) ?? null
    );
  }, [selectedAttributes, variations]);

  const currentPrice = selectedVariation
    ? parseFloat(
        selectedVariation.sale_price || selectedVariation.price || "0"
      )
    : null;

  return (
    <>
      <ProductVariantSelector
        attributes={attributes}
        variations={variations}
        selected={selectedAttributes}
        onChange={handleAttributeChange}
      />

      {selectedVariation && currentPrice !== null && (
        <div className="rounded-lg bg-surface-light p-4">
          <p className="text-sm text-ink-muted">Selected price:</p>
          <p className="font-heading text-2xl font-bold text-brand-orange-500">
            {formatPrice(currentPrice)}
          </p>
        </div>
      )}

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
      </div>

      <AddToCartButton
        product={product}
        selectedVariation={selectedVariation}
        selectedAttributes={selectedAttributes}
        quantity={quantity}
      />
    </>
  );
}
