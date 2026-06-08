import type { Metadata } from 'next';
import { getProducts } from '@/lib/woocommerce';
import ProductGrid from '@/components/product/ProductGrid';
import SearchForm from './SearchForm';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search our eco-friendly home product catalog.',
};

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const { products } = q ? await getProducts({ search: q, per_page: '20' }) : { products: [] };

  return (
    <section style={{ padding: '3rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0F0F1A', marginBottom: '0.5rem' }}>
            Search Results
          </h1>
          <p style={{ color: '#64748B' }}>
            {q ? `Showing results for "${q}"` : 'Enter a search term to find products'}
          </p>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <SearchForm initialQuery={q || ''} />
        </div>

        {q && products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <Search size={64} color="#CBD5E1" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: '#64748B' }}>No products found for &ldquo;{q}&rdquo;.</p>
            <p style={{ color: '#64748B', fontSize: '0.875rem' }}>Try adjusting your search terms.</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
}
