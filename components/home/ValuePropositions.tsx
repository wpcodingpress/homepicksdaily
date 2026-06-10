'use client';
import { Leaf, Truck, Shield, Award, ArrowRight } from 'lucide-react';

const values = [
  { icon: Leaf, title: '100% Eco-Friendly', desc: 'Every product meets our strict sustainability standards for a greener home.' },
  { icon: Truck, title: 'Express Delivery', desc: 'Same-day dispatch with tracked worldwide shipping and full insurance.' },
  { icon: Shield, title: 'Buyer Protection', desc: 'Shop with confidence — PayPal protection on every single order.' },
  { icon: Award, title: 'Quality Promise', desc: '30-day no-questions guarantee. We stand behind every product we sell.' },
];

export default function ValuePropositions() {
  return (
    <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card" style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '50%',
                background: 'rgba(0,188,212,0.1)', color: '#00BCD4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                transition: 'all 0.3s ease',
              }}>
                <Icon size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.125rem', color: '#0F1923', marginBottom: '0.5rem' }}>
                {title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7 }}>{desc}</p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                marginTop: '0.75rem', fontSize: '0.8125rem', fontWeight: 600,
                color: '#F5811F',
              }}>
                Learn more <ArrowRight size={14} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
