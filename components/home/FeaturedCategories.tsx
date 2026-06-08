import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/woocommerce';
import { decodeHtml } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

const categoryImages: Record<string, string> = {
  'kitchen-starter-kits': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  'home-storage-organization': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'home-garden': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
  'refill-solutions': 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80',
  'toys-hobbies': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80',
  'kitchendining-bar': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
};

export default async function FeaturedCategories() {
  const categories = await getCategories();
  const display = categories.slice(0, 5);

  return (
    <section style={{ background: '#F1F5F9', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">Explore</span>
          <h2 className="section-title">Shop by Category</h2>
          <p style={{ color: '#64748B', fontSize: '1.0625rem' }}>Curated collections for every room in your home</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {display.map((cat, i) => {
            const isLarge = i === 0;
            const imgSrc = categoryImages[cat.slug] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80';
            return (
              <Link key={cat.id} href={`/category/${cat.slug}`}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '1.25rem',
                  minHeight: isLarge ? '320px' : '220px',
                  gridColumn: isLarge ? 'span 2' : undefined,
                  gridRow: isLarge ? 'span 2' : undefined,
                  display: 'block',
                  transition: 'all 0.4s ease',
                }}>
                <Image src={imgSrc} alt={decodeHtml(cat.name)} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} loading="lazy" />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15,15,26,0.85), rgba(15,15,26,0.1))',
                  zIndex: 1,
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
                  padding: '1.5rem',
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: isLarge ? '1.5rem' : '1.125rem', color: 'white' }}>
                      {decodeHtml(cat.name)}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
                      {cat.count} product{cat.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ChevronRight size={20} color="white" style={{ opacity: 0, transition: 'all 0.3s ease' }} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
