import type { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";
import SearchForm from "./SearchForm";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Search our eco-friendly home product catalog.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;

  const { products } = q
    ? await getProducts({ search: q, per_page: "20" })
    : { products: [] };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-extrabold text-[#1C1C2E]">
          Search Results
        </h1>
        <p className="mt-2 text-[#6B7280]">
          {q
            ? `Showing results for "${q}"`
            : "Enter a search term to find products"}
        </p>
      </div>

      <div className="mb-12">
        <SearchForm initialQuery={q || ""} />
      </div>

      {q && products.length === 0 ? (
        <div className="py-16 text-center">
          <Search className="mx-auto h-16 w-16 text-gray-300" />
          <p className="mt-4 text-[#6B7280]">
            No products found for &ldquo;{q}&rdquo;.
          </p>
          <p className="text-sm text-[#6B7280]">
            Try adjusting your search terms.
          </p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
