'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import OrderSummary from '@/components/checkout/OrderSummary';

const billingSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone is required'),
  address_1: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postcode: z.string().min(1, 'Postcode is required'),
  country: z.string().min(1, 'Country is required'),
});

type BillingForm = z.infer<typeof billingSchema>;

const fieldMeta = [
  { key: 'first_name' as const, colSpan: false },
  { key: 'last_name' as const, colSpan: false },
  { key: 'email' as const, colSpan: false },
  { key: 'phone' as const, colSpan: false },
  { key: 'address_1' as const, colSpan: true },
  { key: 'city' as const, colSpan: false },
  { key: 'postcode' as const, colSpan: false },
  { key: 'country' as const, colSpan: true },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', borderRadius: '0.75rem',
  border: '1px solid #E2E8F0', fontSize: '0.9375rem',
  fontFamily: 'var(--font-body)', outline: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.875rem', fontWeight: 500,
  color: '#0F1923', marginBottom: '0.25rem', textTransform: 'capitalize',
};

export default function CheckoutPageClient() {
  const items = useCartStore(s => s.items);
  const clearCart = useCartStore(s => s.clearCart);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'redirecting'>('idle');
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<BillingForm>({
    resolver: zodResolver(billingSchema),
    defaultValues: { country: 'US' },
  });

  const onSubmit = async (data: BillingForm) => {
    if (items.length === 0) return;
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billing: data, items: items.map(i => ({ id: i.id, variationId: i.variationId, quantity: i.quantity })) }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to create order');
      setStatus('redirecting');
      clearCart();
      window.location.href = result.paymentUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setStatus('error');
    }
  };

  if (items.length === 0 && status !== 'redirecting') {
    return (
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: '#0F1923' }}>Your cart is empty</h1>
          <Link href="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>Shop Now</Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: '#F8FAFC', padding: '2rem 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748B', marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'inherit' }}>Home</Link>
          <span>/</span>
          <Link href="/cart" style={{ color: 'inherit' }}>Cart</Link>
          <span>/</span>
          <span style={{ color: '#0F1923', fontWeight: 600 }}>Checkout</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0F1923', marginBottom: '2rem' }}>
          Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
              <h2 style={{ borderLeft: '4px solid #F5811F', paddingLeft: '0.75rem', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: '#0F1923', marginBottom: '1.5rem' }}>
                Billing Information
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                {fieldMeta.map(({ key, colSpan }) => (
                  <div key={key} style={colSpan ? { gridColumn: '1 / -1' } : undefined}>
                    <label style={labelStyle}>{key.replace(/_/g, ' ')} *</label>
                    <input {...register(key)} style={inputStyle} />
                    {errors[key] && <p style={{ color: '#EF4444', fontSize: '0.75rem', marginTop: '0.25rem' }}>{errors[key].message}</p>}
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" disabled={status === 'loading' || status === 'redirecting'}
              className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <CreditCard size={18} />
              {status === 'loading' ? 'Processing...' : status === 'redirecting' ? 'Redirecting to PayPal...' : 'Place Order & Pay with PayPal'}
            </button>

            {error && <p style={{ background: '#FEF2F2', color: '#EF4444', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginTop: '1rem' }}>{error}</p>}
          </form>

          {/* Order Summary */}
          <OrderSummary items={items} />
        </div>
      </div>
    </section>
  );
}
