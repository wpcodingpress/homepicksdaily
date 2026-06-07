"use client";

import { getCustomerAttributes } from "@/lib/utils";
import type { WCAttribute, WCVariation } from "@/lib/types";

interface ProductVariantSelectorProps {
  attributes: WCAttribute[];
  variations: WCVariation[];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export default function ProductVariantSelector({
  attributes,
  variations,
  selected,
  onChange,
}: ProductVariantSelectorProps) {
  const customerAttrs = getCustomerAttributes(attributes);

  if (customerAttrs.length === 0) return null;

  return (
    <div className="space-y-4">
      {customerAttrs.map((attr) => {
        const isColor = attr.name.toLowerCase() === "color";

        return (
          <div key={attr.slug}>
            <label className="mb-2 block text-sm font-semibold text-ink">
              {attr.name}:
              <span className="ml-1 text-ink-muted font-normal">
                {selected[attr.name] || "Select"}
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {attr.options.map((option) => {
                const isSelected = selected[attr.name] === option;
                return isColor ? (
                  <button
                    key={option}
                    onClick={() => onChange(attr.name, option)}
                    className={`flex h-10 items-center gap-2 rounded-lg border-2 px-4 text-sm font-semibold transition-colors ${
                      isSelected
                        ? "border-brand-orange-500 bg-brand-orange-500/10 text-brand-orange-500"
                        : "border-surface-muted text-ink hover:border-ink-light"
                    }`}
                  >
                    {option}
                  </button>
                ) : (
                  <button
                    key={option}
                    onClick={() => onChange(attr.name, option)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors ${
                      isSelected
                        ? "border-brand-orange-500 bg-brand-orange-500/10 text-brand-orange-500"
                        : "border-surface-muted text-ink hover:border-ink-light"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
