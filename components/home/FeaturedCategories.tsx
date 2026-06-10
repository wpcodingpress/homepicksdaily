'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { decodeHtml } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  image: { src: string } | null;
}

const categoryImages: Record<string, string> = {
  'kitchen-starter-kits': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85&auto=format&fit=crop',
  'home-storage-organization': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85&auto=format&fit=crop',
  'home-garden': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=85&auto=format&fit=crop',
  'refill-solutions': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=85&auto=format&fit=crop',
  'toys-hobbies': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=85&auto=format&fit=crop',
  'kitchendining-bar': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85&auto=format&fit=crop',
  'starter-kits': 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=85&auto=format&fit=crop',
  'default': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85&auto=format&fit=crop',
};

const categoryColors: Record<string, string> = {
  'kitchen-starter-kits': '#F5811F',
  'home-storage-organization': '#1B3F72',
  'home-garden': '#10B981',
  'refill-solutions': '#00BCD4',
  'toys-hobbies': '#8B5CF6',
  'kitchendining-bar': '#EF4444',
  'default': '#F5811F',
};

function getCategoryImage(slug: string): string {
  return categoryImages[slug] ?? categoryImages['default'];
}

function getCategoryColor(slug: string): string {
  return categoryColors[slug] ?? categoryColors['default'];
}

export default function FeaturedCategories({ categories }: { categories: Category[] }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const displayCats = categories
    .filter(c => c.slug !== 'uncategorized' && c.count > 0)
    .slice(0, 6);

  if (displayCats.length === 0) return null;

  return (
    <section className="section" style={{ background: 'var(--color-light-bg)' }}>
      <div className="container">

        {/* Section Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          <div>
            <span className="section-eyebrow">Browse</span>
            <h2 className="section-title" style={{ margin:0 }}>Shop by Category</h2>
            <p style={{ color:'var(--color-text-muted)', marginTop:'0.5rem', fontFamily:'var(--font-body)', fontSize:'1rem' }}>
              Curated collections for every room in your home
            </p>
          </div>
          <Link href="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: '#F5811F',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            All Categories <ArrowRight size={16} />
          </Link>
        </div>

        {/* Categories Grid — Masonry-style */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(2, 240px)',
          gap: '1rem',
        }}
        className="categories-grid"
        >
          {displayCats.map((cat, index) => {
            const isHovered = hoveredId === cat.id;
            const imgSrc = cat.image?.src ?? getCategoryImage(cat.slug);
            const accentColor = getCategoryColor(cat.slug);

            const gridAreas = [
              { col: '1 / span 5', row: '1 / span 1' },
              { col: '6 / span 4', row: '1 / span 1' },
              { col: '10 / span 3', row: '1 / span 2' },
              { col: '1 / span 3', row: '2 / span 1' },
              { col: '4 / span 3', row: '2 / span 1' },
              { col: '7 / span 3', row: '2 / span 1' },
            ];

            const area = gridAreas[index] ?? gridAreas[0];

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                style={{
                  gridColumn: area.col,
                  gridRow: area.row,
                  position: 'relative',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  display: 'block',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background image */}
                <Image
                  src={imgSrc}
                  alt={decodeHtml(cat.name)}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: isHovered ? 'scale(1.07)' : 'scale(1)',
                    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isHovered
                    ? `linear-gradient(to top, ${accentColor}CC 0%, ${accentColor}44 50%, rgba(0,0,0,0.1) 100%)`
                    : 'linear-gradient(to top, rgba(15,25,35,0.85) 0%, rgba(15,25,35,0.3) 50%, rgba(15,25,35,0.05) 100%)',
                  transition: 'background 0.4s ease',
                }} />

                {/* Content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '1.25rem 1.5rem',
                }}>
                  {/* Accent bar */}
                  <div style={{
                    width: isHovered ? '48px' : '32px',
                    height: '3px',
                    background: accentColor,
                    borderRadius: '2px',
                    marginBottom: '0.625rem',
                    transition: 'width 0.3s ease',
                  }} />

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                    fontWeight: 800,
                    color: 'white',
                    marginBottom: '0.25rem',
                    lineHeight: 1.2,
                    textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                  }}>
                    {decodeHtml(cat.name)}
                  </h3>

                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.8125rem',
                      fontFamily: 'var(--font-body)',
                    }}>
                      {cat.count} product{cat.count !== 1 ? 's' : ''}
                    </span>
                    <div style={{
                      width: '32px', height: '32px',
                      borderRadius: '50%',
                      background: accentColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(8px) scale(0)',
                      opacity: isHovered ? 1 : 0,
                      transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <ArrowRight size={14} color="white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile grid */}
        <style>{`
          @media (max-width: 768px) {
            .categories-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-template-rows: repeat(3, 200px) !important;
            }
            .categories-grid > a {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
            }
            .categories-grid > a:first-child {
              grid-column: span 2 !important;
            }
          }
          @media (max-width: 480px) {
            .categories-grid {
              grid-template-rows: repeat(3, 170px) !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
