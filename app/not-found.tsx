import Link from 'next/link';
import { Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <section style={{ background: '#0F0F1A', padding: '8rem 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(5rem, 10vw, 120px)', fontWeight: 900, color: '#FF5722', lineHeight: 1 }}>
          404
        </h1>

        <div style={{ marginBottom: '1.5rem' }}>
          <svg className="mx-auto" width="80" height="80" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.2)">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>
          Page not found
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '400px', margin: '0 auto 2rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            <Home size={18} /> Go Home
          </Link>
          <Link href="/shop" className="btn btn-secondary">
            <ShoppingBag size={18} /> Shop Products
          </Link>
        </div>
      </div>
    </section>
  );
}
