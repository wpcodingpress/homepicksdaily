"use client";

import { useState } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { WCProduct } from "@/lib/types";

const tabs = [
  { label: "All", filter: "" },
  { label: "Kitchen", filter: "kitchen" },
  { label: "Storage", filter: "storage" },
  { label: "Garden", filter: "garden" },
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
            <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-brand-orange">
              Bestsellers
            </p>
            <h2 className="mt-1 font-heading text-3xl font-extrabold text-brand-blue sm:text-4xl">
              Our Most Popular Picks
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden whitespace-nowrap text-sm font-semibold text-brand-orange transition-colors hover:text-brand-orange-light sm:inline"
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
                  ? "bg-brand-orange text-white shadow-[0_2px_12px_rgba(255,107,0,0.3)]"
                  : "border border-[rgba(10,37,64,0.12)] bg-white text-ink-muted hover:border-brand-orange hover:text-brand-orange"
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
            className="inline-block rounded-lg bg-brand-orange px-8 py-3 font-bold text-white"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
