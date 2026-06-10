import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import { decodeHtml } from "@/lib/utils";
import PageHeader from "@/components/ui/PageHeader";
import ProductGrid from "@/components/product/ProductGrid";
import Pagination from "@/components/shop/Pagination";
import { ChevronRight } from "lucide-react";

const WC_BASE = process.env.WC_API_BASE!;
const auth = Buffer.from(
  `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
).toString("base64");

const categoryImages: Record<string, string> = {
  'kitchen-starter-kits': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=90&auto=format&fit=crop',
  'home-storage-organization': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90&auto=format&fit=crop',
  'home-garden': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=90&auto=format&fit=crop',
  'refill-solutions': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1600&q=90&auto=format&fit=crop',
  'toys-hobbies': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1600&q=90&auto=format&fit=crop',
  'kitchendining-bar': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=90&auto=format&fit=crop',
  'default': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=90&auto=format&fit=crop',
};

function getCategoryImage(slug: string): string {
  return categoryImages[slug] ?? categoryImages['default'];
}

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
    title: `${decodeHtml(cat.name)} | HomePicksDaily`,
    description: `Shop ${decodeHtml(cat.name)} products at HomePicksDaily. Eco-friendly home and cleaning essentials.`,
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

  const currentPage = parseInt(page ?? "1", 10);
  const catImage = cat.image?.src ?? getCategoryImage(slug);

  return (
    <>
      <PageHeader
        title={decodeHtml(cat.name)}
        subtitle={`${cat.count} product${cat.count !== 1 ? 's' : ''} in this collection`}
        backgroundImage={catImage}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shop', href: '/shop' },
          { label: decodeHtml(cat.name) },
        ]}
      />

      <section className="section" style={{ background: 'white' }}>
        <div className="container">

          {/* Top bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1.25rem',
            borderBottom: '1px solid var(--color-light-border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)',
              }}>
                Showing {products.length} of {cat.count} results
              </span>
            </div>
            <Link href="/shop" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              fontSize: '0.875rem', fontWeight: 600, color: '#F5811F',
              textDecoration: 'none',
            }}>
              View All Products <ChevronRight size={16} />
            </Link>
          </div>

          {/* Product grid */}
          <ProductGrid products={products} />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/category/${slug}`}
          />

          {/* Empty state */}
          {products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--color-text)',
                marginBottom: '0.75rem',
              }}>
                No products yet
              </h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                This category is being updated. Check back soon or browse all products.
              </p>
              <Link href="/shop" className="btn btn-primary">
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
