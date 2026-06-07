import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/shop/Pagination";
import Skeleton from "@/components/ui/Skeleton";
import { decodeHtml } from "@/lib/utils";

const WC_BASE = process.env.WC_API_BASE!;
const auth = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

async function getCategory(slug: string) {
  if (slug === "uncategorized") {
    redirect("/shop");
  }
  const res = await fetch(
    `${WC_BASE}/products/categories?slug=${slug}`,
    { headers: { Authorization: `Basic ${auth}` } }
  );
  const cats = await res.json();
  if (!Array.isArray(cats) || cats.length === 0) {
    notFound();
  }
  return cats[0];
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = await getCategory(slug);
  return {
    title: decodeHtml(cat.name),
    description: `Shop ${decodeHtml(cat.name)} products at HomePicksDaily.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const cat = await getCategory(slug);

  const { products, totalPages } = await getProducts({
    category: String(cat.id),
    page: page ?? "1",
    per_page: "20",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-heading text-3xl font-bold text-ink">
        {decodeHtml(cat.name)}
      </h1>

      <ProductGrid products={products} />

      <Pagination
        currentPage={parseInt(page ?? "1", 10)}
        totalPages={totalPages}
        basePath={`/category/${slug}`}
      />
    </div>
  );
}
