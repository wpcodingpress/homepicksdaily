import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/woocommerce';
import ProductGrid from '@/components/product/ProductGrid';
import ProductCardSkeleton from '@/components/ui/Skeleton';
import ShopFilters from '@/components/shop/ShopFilters';
import SortDropdown from '@/components/shop/SortDropdown';
import ActiveFilterTags from '@/components/shop/ActiveFilterTags';
import Pagination from '@/components/shop/Pagination';
import { Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse our full collection of eco-friendly home and cleaning products.',
};

interface ShopPageProps {
  searchParams: Promise<{ page?: string; category?: string; orderby?: string; min_price?: string; max_price?: string }>;
}

function SkeletonGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
      {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const sp = await searchParams;
  const page = sp.page ?? '1';
  const orderby = sp.orderby ?? 'popularity';

  const params: Record<string, string> = { page, per_page: '20', orderby };
  if (sp.category) params.category = sp.category;
  if (sp.min_price) params.min_price = sp.min_price;
  if (sp.max_price) params.max_price = sp.max_price;

  const { products, totalPages } = await getProducts(params);

  return (
    <>
      {/* Banner */}
      <section style={{ background: '#0F0F1A', padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' }}>
            <Link href="/" style={{ color: 'inherit' }}><Home size={16} /></Link>
            <ChevronRight size={14} />
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>Shop</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, color: 'white' }}>
            Our Products
          </h1>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Filters + Sort */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <ShopFilters />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                <ActiveFilterTags />
                <SortDropdown />
              </div>
            </div>

            {/* Grid */}
            <Suspense fallback={<SkeletonGrid />}>
              <ProductGrid products={products} />
            </Suspense>

            {/* Pagination */}
            <Pagination currentPage={parseInt(page, 10)} totalPages={totalPages} basePath="/shop" searchParams={sp as Record<string, string>} />
          </div>
        </div>
      </section>
    </>
  );
}
