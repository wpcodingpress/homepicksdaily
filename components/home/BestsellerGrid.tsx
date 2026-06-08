"use client";

import { useState } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProductGrid from "@/components/product/ProductGrid";
import type { WCProduct } from "@/lib/types";

const tabs = [
  { label: "All", filter: "" },
  { label: "Kitchen", filter: "kitchen" },
  { label: "Storage", filter: "storage" },
  { label: "Garden", filter: "garden" },
  { label: "Refill", filter: "refill" },
];

interface BestsellerGridProps {
  initialProducts: WCProduct[];
}

export default function BestsellerGrid({
  initialProducts,
}: BestsellerGridProps) {
  const [activeTab, setActiveTab] = useState("All");
  const ref = useScrollReveal<HTMLDivElement>();

  const filtered =
    activeTab === "All"
      ? initialProducts
      : initialProducts.filter((p) =>
          p.categories.some((c) =>
            c.slug.toLowerCase().includes(activeTab.toLowerCase())
          )
        );

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#00BCD4]">
              Bestsellers
            </p>
            <h2 className="mt-1 font-heading text-3xl font-extrabold text-[#1C1C2E] sm:text-4xl">
              Our Most Popular Picks
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden whitespace-nowrap text-sm font-semibold text-[#FF5722] transition-colors hover:text-[#FF7043] sm:inline"
          >
            View All &rarr;
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.label
                  ? "bg-[#FF5722] text-white shadow-[0_2px_12px_rgba(255,87,34,0.3)]"
                  : "border border-gray-200 bg-white text-[#6B7280] hover:border-[#FF5722] hover:text-[#FF5722]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div ref={ref} className="reveal">
          <ProductGrid products={filtered} />
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-block rounded-lg bg-[#FF5722] px-8 py-3 font-bold text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
