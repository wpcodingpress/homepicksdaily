import { Suspense } from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/ui/PageHeader';
import { getProducts } from '@/lib/woocommerce';
import ProductGrid from '@/components/product/ProductGrid';
import ProductCardSkeleton from '@/components/ui/Skeleton';
import ShopFilters from '@/components/shop/ShopFilters';
import SortDropdown from '@/components/shop/SortDropdown';
import ActiveFilterTags from '@/components/shop/ActiveFilterTags';
import Pagination from '@/components/shop/Pagination';

export const metadata: Metadata = {
  title: 'Shop All Products | HomePicksDaily',
  description: 'Explore our full range of eco-friendly home essentials.',
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
      <PageHeader
        title="Our Products"
        subtitle="Explore our full range of eco-friendly home essentials"
        backgroundImage="/home-page-header-desktop.gif"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shop' },
        ]}
      />

      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <ShopFilters />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                <ActiveFilterTags />
                <SortDropdown />
              </div>
            </div>

            <Suspense fallback={<SkeletonGrid />}>
              <ProductGrid products={products} />
            </Suspense>

            <Pagination currentPage={parseInt(page, 10)} totalPages={totalPages} basePath="/shop" searchParams={sp as Record<string, string>} />
          </div>
        </div>
      </section>
    </>
  );
}
