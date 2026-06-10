"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

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

  const clearFilters = () => {
    router.push("/shop");
  };

  return (
    <aside className="space-y-6 rounded-xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-[#0F1923]">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-[#F5811F] transition-colors hover:text-[#FF7043]"
        >
          Clear Filters
        </button>
      </div>

      <div>
        <button className="flex w-full items-center justify-between py-2 text-sm font-semibold text-[#0F1923]">
          Price Range
          <ChevronRight className="w-4 h-4 text-gray-400 -rotate-90" />
        </button>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F1923] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#F5811F]"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#0F1923] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#F5811F]"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="mt-2 w-full rounded-lg bg-[#F5811F] py-2 text-sm font-bold text-white transition-colors hover:bg-[#FF7043]"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}
