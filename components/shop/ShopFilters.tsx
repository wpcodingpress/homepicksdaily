"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ShopFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [min, setMin] = useState(searchParams.get("min_price") ?? "");
  const [max, setMax] = useState(searchParams.get("max_price") ?? "");

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (min) params.set("min_price", min);
    else params.delete("min_price");
    if (max) params.set("max_price", max);
    else params.delete("max_price");
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-3 font-heading text-sm font-bold uppercase text-ink">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-lg border border-surface-muted px-3 py-2 text-sm text-ink placeholder:text-ink-light focus:ring-2 focus:ring-brand-orange-500"
          />
          <span className="text-ink-light">-</span>
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-lg border border-surface-muted px-3 py-2 text-sm text-ink placeholder:text-ink-light focus:ring-2 focus:ring-brand-orange-500"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="mt-2 w-full rounded-lg bg-brand-orange-500 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-orange-600"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}
