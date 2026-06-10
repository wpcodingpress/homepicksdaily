'use client';
import { useState } from 'react';
import Link from 'next/link';
import ProductGrid from '@/components/product/ProductGrid';
import type { WCProduct } from '@/lib/types';

const tabs = [
  { label: 'All', filter: '' },
  { label: 'Kitchen', filter: 'kitchen' },
  { label: 'Storage', filter: 'storage' },
  { label: 'Garden', filter: 'garden' },
  { label: 'Refill', filter: 'refill' },
];

interface BestsellerGridProps {
  initialProducts: WCProduct[];
}

export default function BestsellerGrid({ initialProducts }: BestsellerGridProps) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? initialProducts
    : initialProducts.filter(p => p.categories.some(c => c.slug.toLowerCase().includes(activeTab.toLowerCase())));

  return (
    <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-eyebrow">Bestsellers</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Our Most Popular Picks</h2>
          </div>
          <Link href="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
            fontSize: '0.875rem', fontWeight: 600, color: '#F5811F',
            whiteSpace: 'nowrap',
          }}>View All &rarr;</Link>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {tabs.map(tab => (
            <button key={tab.label} onClick={() => setActiveTab(tab.label)}
              style={{
                padding: '0.5rem 1.25rem', borderRadius: '2rem',
                fontSize: '0.875rem', fontWeight: 700, fontFamily: 'var(--font-heading)',
                border: activeTab === tab.label ? 'none' : '1px solid #E2E8F0',
                background: activeTab === tab.label ? '#F5811F' : 'white',
                color: activeTab === tab.label ? 'white' : '#64748B',
                boxShadow: activeTab === tab.label ? '0 2px 12px rgba(245,129,31,0.3)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        <ProductGrid products={filtered} />

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/shop" className="btn btn-primary">View All Products</Link>
        </div>
      </div>
    </section>
  );
}
