"use client";

import { cn } from "@/lib/utils";
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
  const getAvailableOptions = (attrName: string) => {
    const attrSlug = `attribute_${attrName.toLowerCase()}`;
    return variations
      .filter((v) => v.purchasable)
      .filter((v) =>
        Object.entries(selected).every(
          ([key, val]) =>
            !val ||
            key === attrName ||
            v.attributes.some(
              (a) => `attribute_${a.name.toLowerCase()}` === `attribute_${key.toLowerCase()}` && a.option === val
            )
        )
      )
      .flatMap((v) =>
        v.attributes
          .filter((a) => `attribute_${a.name.toLowerCase()}` === attrSlug)
          .map((a) => a.option)
      );
  };

  return (
    <div className="space-y-4">
      {attributes.map((attr) => {
        const attrKey = attr.name;
        const available = getAvailableOptions(attrKey);

        return (
          <div key={attrKey}>
            <label className="mb-2 block text-sm font-semibold text-[#1C1C2E]">
              {attrKey}: <span className="ml-1 font-normal text-[#6B7280]">{selected[attrKey] || "Select"}</span>
            </label>

            {attr.slug === "pa_color" || attrKey.toLowerCase().includes("color") ? (
              <div className="flex flex-wrap gap-2">
                {attr.options.map((opt) => {
                  const isAvailable = available.includes(opt);
                  const isSelected = selected[attrKey] === opt;
                  return (
                    <button
                      key={opt}
                      disabled={!isAvailable}
                      onClick={() => onChange(attrKey, opt)}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                        isSelected
                          ? "border-[#FF5722] ring-2 ring-[#FF5722]/30 scale-110"
                          : "border-gray-200 hover:border-gray-400",
                        !isAvailable && "opacity-30 cursor-not-allowed"
                      )}
                      title={opt}
                      aria-label={opt}
                    >
                      <span
                        className="h-6 w-6 rounded-full"
                        style={{ backgroundColor: opt.toLowerCase() }}
                      />
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {attr.options.map((opt) => {
                  const isAvailable = available.includes(opt);
                  const isSelected = selected[attrKey] === opt;
                  return (
                    <button
                      key={opt}
                      disabled={!isAvailable}
                      onClick={() => onChange(attrKey, opt)}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                        isSelected
                          ? "border-[#FF5722] bg-[#FF5722]/10 text-[#FF5722]"
                          : "border-gray-200 text-[#1C1C2E] hover:border-gray-400",
                        !isAvailable && "opacity-30 cursor-not-allowed"
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
