import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";
import ProductCardSkeleton from "@/components/ui/Skeleton";
import ShopFilters from "@/components/shop/ShopFilters";
import SortDropdown from "@/components/shop/SortDropdown";
import ActiveFilterTags from "@/components/shop/ActiveFilterTags";
import Pagination from "@/components/shop/Pagination";
import { Home, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our full collection of eco-friendly home and cleaning products.",
};

interface ShopPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    orderby?: string;
    min_price?: string;
    max_price?: string;
  }>;
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const sp = await searchParams;
  const page = sp.page ?? "1";
  const orderby = sp.orderby ?? "popularity";

  const params: Record<string, string> = {
    page,
    per_page: "20",
    orderby,
  };
  if (sp.category) params.category = sp.category;
  if (sp.min_price) params.min_price = sp.min_price;
  if (sp.max_price) params.max_price = sp.max_price;

  const { products, totalPages } = await getProducts(params);

  return (
    <>
      <section className="bg-[#1C1C2E] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90">Shop</span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            Our Products
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-72 lg:flex-shrink-0">
            <ShopFilters />
          </div>

          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <ActiveFilterTags />
              <SortDropdown />
            </div>

            <Suspense fallback={<SkeletonGrid />}>
              <ProductGrid products={products} />
            </Suspense>

            <Pagination
              currentPage={parseInt(page, 10)}
              totalPages={totalPages}
              basePath="/shop"
              searchParams={sp as Record<string, string>}
            />
          </div>
        </div>
      </div>
    </>
  );
}
