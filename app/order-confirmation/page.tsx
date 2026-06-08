import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been placed successfully.',
};

interface Props {
  searchParams: Promise<{ orderId?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: Props) {
  const { orderId } = await searchParams;

  return (
    <section style={{ background: '#F8FAFC', padding: '6rem 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <CheckCircle size={80} color="#10B981" style={{ margin: '0 auto 1.5rem' }} />
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#0F0F1A', marginBottom: '0.75rem' }}>
          Order Confirmed!
        </h1>
        {orderId && (
          <p style={{ color: '#64748B', fontSize: '1.0625rem', marginBottom: '0.5rem' }}>
            Your order <strong style={{ color: '#0F0F1A' }}>#{orderId}</strong> has been placed successfully.
          </p>
        )}
        <p style={{ color: '#64748B', fontSize: '0.9375rem', marginBottom: '2rem' }}>
          You will receive a confirmation email with your order details shortly.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
          <Link href="/" className="btn btn-outline">Go Home</Link>
        </div>
      </div>
    </section>
  );
}
