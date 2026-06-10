'use client';
import { Search, ShoppingCart, Package } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Discover', desc: 'Browse 500+ curated eco-friendly home products from top sustainable brands.' },
  { icon: ShoppingCart, title: 'Order', desc: 'Add to cart, checkout securely via PayPal in under 60 seconds.' },
  { icon: Package, title: 'Delivered', desc: 'Fast tracked worldwide shipping straight to your doorstep.' },
];

export default function HowItWorks() {
  return (
    <section style={{ background: '#F1F5F9', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-eyebrow">How It Works</span>
          <h2 className="section-title">Three Simple Steps</h2>
          <p style={{ color: '#64748B', fontSize: '1.0625rem' }}>Getting started is easy</p>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem',
          position: 'relative',
        }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute', left: '16%', right: '16%', top: '36px',
            borderTop: '2px dashed #F5811F', opacity: 0.3,
          }} className="hidden md:block" />

          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: '#F5811F', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem', fontWeight: 900,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ color: '#00BCD4', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <Icon size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: '#0F1923', marginBottom: '0.5rem' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
