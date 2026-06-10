'use client';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

export default function CartPageClient() {
  const items = useCartStore(s => s.items);

  if (items.length === 0) {
    return (
      <section style={{ background: '#F8FAFC', padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <ShoppingCart size={80} style={{ color: '#CBD5E1', margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0F1923', marginBottom: '0.5rem' }}>
            Your cart is empty
          </h1>
          <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="btn btn-primary">Start Shopping</Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: '#F8FAFC', padding: '2rem 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748B', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: 'inherit' }}>Home</Link>
          <span>/</span>
          <span style={{ color: '#0F1923', fontWeight: 600 }}>Cart</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0F1923', marginBottom: '2rem' }}>
          Shopping Cart
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Items */}
          <div>
            <div style={{ borderTop: '1px solid #E2E8F0' }}>
              {items.map(item => (
                <div key={`${item.id}-${item.variationId ?? ''}`} style={{ borderBottom: '1px solid #E2E8F0', padding: '1.25rem 0' }}>
                  <CartItem item={item} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#F5811F' }}>
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <CartSummary />
            <Link href="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <ShoppingCart size={18} /> Proceed to Checkout
            </Link>
            <Link href="/shop" style={{ textAlign: 'center', fontSize: '0.875rem', fontWeight: 500, color: '#00BCD4' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
