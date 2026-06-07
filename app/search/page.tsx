import type { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";
import SearchForm from "./SearchForm";

export const metadata: Metadata = {
  title: "Search Products",
  description: "Search our catalog of eco-friendly home products.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  let products: Awaited<ReturnType<typeof getProducts>>["products"] = [];
  let searched = false;

  if (q && q.trim()) {
    searched = true;
    const result = await getProducts({ search: q.trim(), per_page: "20" });
    products = result.products;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-ink">
          Search
        </h1>
      </div>

      <SearchForm initialQuery={q ?? ""} />

      {searched && (
        <div className="mt-6">
          <p className="mb-4 text-ink-muted">
            {products.length === 0
              ? `No results found for "${q}"`
              : `Showing ${products.length} result${products.length === 1 ? "" : "s"} for "${q}"`}
          </p>
          <ProductGrid products={products} />
        </div>
      )}
    </div>
  );
}
