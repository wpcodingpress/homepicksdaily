import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProductBySlug, getProductVariations } from '@/lib/woocommerce';
import { seoTitle, getCustomerAttributes } from '@/lib/utils';
import { Shield, Truck, RefreshCw, ChevronRight, Home } from 'lucide-react';
import ProductBreadcrumb from '@/components/product/ProductBreadcrumb';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductPrice from '@/components/product/ProductPrice';
import VariantSelectorWrapper from './VariantSelectorWrapper';
import SimpleProductForm from '@/components/product/SimpleProductForm';
import RelatedProducts from '@/components/product/RelatedProducts';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: seoTitle(product.name),
    description: product.short_description?.replace(/<[^>]*>/g, '').slice(0, 160) || undefined,
    openGraph: { images: product.images?.[0]?.src ? [{ url: product.images[0].src }] : [] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const variations = product.type === 'variable' ? await getProductVariations(product.id) : [];
  const customerAttrs = getCustomerAttributes(product.attributes);

  const productInfo = { id: product.id, name: product.name, slug: product.slug, type: product.type, price: product.price, stock_status: product.stock_status, images: product.images, sku: product.sku };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_description?.replace(/<[^>]*>/g, ''),
    image: product.images?.[0]?.src,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.type === 'variable' ? undefined : product.price,
      priceCurrency: 'USD',
      availability: product.stock_status === 'instock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    ...(product.average_rating && parseFloat(product.average_rating) > 0 ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: product.average_rating, reviewCount: product.rating_count } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Branded product header */}
      <div style={{ background: 'linear-gradient(135deg, #0F1923 0%, #1B3F72 100%)', padding: '1.5rem 0' }}>
        <div className="container">
          <nav style={{ display:'flex', gap:'0.5rem', fontSize:'0.8125rem', color:'rgba(255,255,255,0.6)' }}>
            <a href="/" style={{color:'rgba(255,255,255,0.6)'}}>Home</a>
            <span>/</span>
            <a href="/shop" style={{color:'rgba(255,255,255,0.6)'}}>Shop</a>
            <span>/</span>
            <span style={{color:'white'}} className="line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
          {/* Gallery */}
          <ProductImageGallery images={product.images} />

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 2.5vw, 1.75rem)', fontWeight: 800, color: '#0F1923', marginBottom: '0.5rem' }}>
                {product.name}
              </h1>
              <ProductPrice price={product.price} regularPrice={product.regular_price} salePrice={product.sale_price} onSale={product.on_sale} priceHtml={product.price_html} type={product.type} />
            </div>

            {product.type === 'variable' && variations.length > 0 && (
              <VariantSelectorWrapper product={productInfo} attributes={customerAttrs} variations={variations} />
            )}
            {product.type !== 'variable' && <SimpleProductForm product={productInfo} />}

            <div className="prose prose-sm" style={{ maxWidth: 'none', color: '#64748B', fontSize: '0.9375rem', lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{ __html: product.short_description }} />

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid #E2E8F0', paddingTop: '1rem' }}>
              {[
                { icon: Shield, label: 'Secure Payment', color: '#00BCD4' },
                { icon: Truck, label: 'Free Shipping Over $50', color: '#00BCD4' },
                { icon: RefreshCw, label: 'Easy Returns', color: '#00BCD4' },
              ].map(({ icon: Icon, label, color }) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: '#64748B' }}>
                  <Icon size={16} color={color} /> {label}
                </span>
              ))}
            </div>

            {/* Stock + SKU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#64748B' }}>
              {product.stock_status === 'instock' ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#10B981', fontWeight: 600 }}>
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  In Stock
                </span>
              ) : <span style={{ color: '#EF4444', fontWeight: 600 }}>Out of Stock</span>}
              {product.sku && <span style={{ marginLeft: 'auto' }}>SKU: {product.sku}</span>}
            </div>
          </div>
        </div>

        {/* Description tab */}
        <div style={{ marginTop: '3rem' }}>
          <div style={{ borderBottom: '1px solid #E2E8F0' }}>
            <span style={{ display: 'inline-block', borderBottom: '2px solid #F5811F', paddingBottom: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.875rem', color: '#0F1923' }}>
              Description
            </span>
          </div>
          <div className="prose prose-sm" style={{ maxWidth: 'none', color: '#64748B', lineHeight: 1.8, marginTop: '1.5rem' }}
            dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>

        <div style={{ marginTop: '3rem' }}>
          <RelatedProducts relatedIds={product.related_ids} />
        </div>
      </div>
    </>
  );
}
