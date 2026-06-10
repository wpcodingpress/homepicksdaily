'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingCart, Star, Heart, Eye, Loader2 } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { formatPrice, extractMinPrice, truncateTitle } from '@/lib/utils';
import { decodeHtml } from '@/lib/utils';
import type { WCProduct } from '@/lib/types';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format&fit=crop';

const tabs = ['All', 'Kitchen', 'Storage', 'Garden', 'Refill'];

const categorySlugs: Record<string, string> = {
  Kitchen: 'kitchen-starter-kits',
  Storage: 'home-storage-organization',
  Garden: 'home-garden',
  Refill: 'refill-solutions',
};

function matchesTab(product: WCProduct, tab: string): boolean {
  if (tab === 'All') return true;
  return product.categories.some(c =>
    decodeHtml(c.name).toLowerCase().includes(tab.toLowerCase()) ||
    c.slug.toLowerCase().includes(tab.toLowerCase())
  );
}

function ProductCard({ product }: { product: WCProduct }) {
  const [wished, setWished] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const openCart = useCartStore(s => s.openCart);

  const imageUrl = product.images[0]?.src ?? PLACEHOLDER;
  const imageUrl2 = product.images[1]?.src ?? null;
  const rating = parseFloat(product.average_rating) || 4.5;
  const fullStars = Math.floor(rating);

  const displayPrice = product.type === 'variable'
    ? `From $${extractMinPrice(product.price_html)}`
    : product.price ? formatPrice(parseFloat(product.price)) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.type === 'variable') return;
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price) || 0,
      quantity: 1,
      image: imageUrl,
    });
    setAddedToCart(true);
    openCart();
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        border: '1px solid var(--color-light-border)',
        boxShadow: hovered
          ? '0 20px 60px rgba(15,25,35,0.14)'
          : '0 2px 16px rgba(15,25,35,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'relative',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        background: '#F8FAFC',
        flexShrink: 0,
      }}>
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            style={{
              objectFit: 'cover',
              opacity: (hovered && imageUrl2) ? 0 : 1,
              transition: 'opacity 0.4s ease, transform 0.5s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {imageUrl2 && (
            <Image
              src={imageUrl2}
              alt={product.name}
              fill
              style={{
                objectFit: 'cover',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          )}
        </Link>

        <div style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          display: 'flex', flexDirection: 'column', gap: '0.375rem',
          zIndex: 2,
        }}>
          {product.on_sale && (
            <span style={{
              background: '#EF4444', color: 'white',
              fontSize: '0.6875rem', fontWeight: 700,
              padding: '0.25rem 0.625rem', borderRadius: '2rem',
              fontFamily: 'var(--font-heading)',
              letterSpacing: '0.05em',
            }}>
              SALE
            </span>
          )}
          {product.featured && !product.on_sale && (
            <span style={{
              background: '#F5811F', color: 'white',
              fontSize: '0.6875rem', fontWeight: 700,
              padding: '0.25rem 0.625rem', borderRadius: '2rem',
              fontFamily: 'var(--font-heading)',
            }}>
              FEATURED
            </span>
          )}
          {product.stock_status === 'outofstock' && (
            <span style={{
              background: '#64748B', color: 'white',
              fontSize: '0.6875rem', fontWeight: 700,
              padding: '0.25rem 0.625rem', borderRadius: '2rem',
              fontFamily: 'var(--font-heading)',
            }}>
              SOLD OUT
            </span>
          )}
        </div>

        <button
          onClick={e => { e.preventDefault(); setWished(w => !w); }}
          style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            zIndex: 2,
            width: '34px', height: '34px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            border: 'none', cursor: 'pointer',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.3s ease',
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            style={{
              color: wished ? '#EF4444' : '#94A3B8',
              fill: wished ? '#EF4444' : 'none',
              transition: 'all 0.2s ease',
            }}
          />
        </button>

        <Link
          href={`/shop/${product.slug}`}
          style={{
            position: 'absolute', bottom: '0.75rem', right: '0.75rem',
            zIndex: 2,
            width: '34px', height: '34px',
            borderRadius: '50%',
            background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.3s ease 0.05s',
          }}
          aria-label="Quick view"
        >
          <Eye size={15} style={{ color: '#64748B' }} />
        </Link>

        <button
          onClick={handleAddToCart}
          disabled={product.stock_status === 'outofstock' || product.type === 'variable'}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            zIndex: 2,
            background: addedToCart ? '#10B981' : '#F5811F',
            color: 'white',
            padding: '0.75rem',
            border: 'none',
            cursor: product.stock_status === 'outofstock' ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.2s ease',
          }}
        >
          <ShoppingCart size={16} />
          {product.stock_status === 'outofstock'
            ? 'Out of Stock'
            : product.type === 'variable'
              ? 'Select Options'
              : addedToCart ? 'Added!' : 'Add to Cart'}
        </button>
      </div>

      <div style={{
        padding: '1rem 1.125rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        flex: 1,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.25rem' }}>
          {[1,2,3,4,5].map(s => (
            <Star
              key={s}
              size={13}
              style={{
                color: '#F59E0B',
                fill: s <= fullStars ? '#F59E0B' : 'none',
              }}
            />
          ))}
          {product.rating_count > 0 && (
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-body)',
              marginLeft: '0.25rem',
            }}>
              ({product.rating_count})
            </span>
          )}
        </div>

        <Link href={`/shop/${product.slug}`} style={{ textDecoration:'none' }}>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.9rem',
            color: 'var(--color-text)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.5rem',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#F5811F')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text)')}
          >
            {truncateTitle(product.name, 65)}
          </h3>
        </Link>

        {product.categories[0] && (
          <span style={{
            fontSize: '0.6875rem',
            color: '#F5811F',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {decodeHtml(product.categories[0].name)}
          </span>
        )}

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '0.625rem',
          borderTop: '1px solid var(--color-light-border)',
        }}>
          <div>
            {displayPrice ? (
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.0625rem',
                color: '#F5811F',
              }}>
                {displayPrice}
              </span>
            ) : (
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                View options
              </span>
            )}
            {product.on_sale && product.regular_price && (
              <span style={{
                textDecoration: 'line-through',
                color: 'var(--color-text-muted)',
                fontSize: '0.8125rem',
                marginLeft: '0.5rem',
              }}>
                ${product.regular_price}
              </span>
            )}
          </div>
          <Link href={`/shop/${product.slug}`} style={{
            width: '34px', height: '34px',
            borderRadius: '50%',
            background: 'var(--color-light-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1B3F72',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#F5811F';
            (e.currentTarget as HTMLElement).style.color = 'white';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--color-light-muted)';
            (e.currentTarget as HTMLElement).style.color = '#1B3F72';
          }}
          >
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BestsellerGrid({ products: initialProducts }: { products: WCProduct[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [allProducts, setAllProducts] = useState<WCProduct[]>(initialProducts);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () => allProducts.filter(p => matchesTab(p, activeTab)).slice(0, 8),
    [allProducts, activeTab]
  );

  const fetchByTab = useCallback(async (tab: string) => {
    if (tab === 'All') {
      setAllProducts(initialProducts);
      return;
    }
    setLoading(true);
    try {
      const slug = categorySlugs[tab];
      const params = slug ? `?category_slug=${slug}&per_page=20` : '?per_page=20';
      const res = await fetch(`/api/products${params}`);
      const data = await res.json();
      setAllProducts(data.products ?? []);
    } catch {
      setAllProducts(initialProducts);
    } finally {
      setLoading(false);
    }
  }, [initialProducts]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const localMatch = initialProducts.filter(p => matchesTab(p, tab));
    if (localMatch.length === 0) {
      fetchByTab(tab);
    }
  };

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">

        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div>
            <span className="section-eyebrow">Bestsellers</span>
            <h2 className="section-title" style={{ margin: 0 }}>Our Most Popular Picks</h2>
          </div>
          <Link href="/shop?featured=true" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: '#F5811F',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem',
          padding: '0.375rem',
          background: 'var(--color-light-muted)',
          borderRadius: '0.875rem',
          width: 'fit-content',
          maxWidth: '100%',
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '0.625rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.875rem',
                border: 'none',
                cursor: 'pointer',
                background: activeTab === tab ? '#F5811F' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--color-text-muted)',
                boxShadow: activeTab === tab ? '0 4px 16px rgba(245,129,31,0.3)' : 'none',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
                display: 'flex', alignItems: 'center', gap: '0.375rem',
              }}
            >
              {tab}
              {loading && activeTab === tab && (
                <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 && !loading ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'var(--color-text-muted)' }}>
            <p>No products found in this category. Try another tab.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
            gap: '1.25rem',
          }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div style={{ textAlign:'center', marginTop:'3rem' }}>
          <Link href="/shop" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
            background: '#1B3F72',
            color: 'white',
            padding: '1rem 2.5rem',
            borderRadius: '0.75rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1rem',
            textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(27,63,114,0.25)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#15325A'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1B3F72'}
          >
            Browse All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
