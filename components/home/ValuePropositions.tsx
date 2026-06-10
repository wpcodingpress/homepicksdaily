'use client';
import Link from 'next/link';
import { Leaf, Truck, Shield, Award, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: '100% Eco-Friendly',
    desc: 'Every product meets our strict sustainability standards for a greener home.',
    href: '/about',
    color: '#10B981',
  },
  {
    icon: Truck,
    title: 'Express Delivery',
    desc: 'Same-day dispatch with tracked worldwide shipping and full insurance.',
    href: '/shipping',
    color: '#F5811F',
  },
  {
    icon: Shield,
    title: 'Buyer Protection',
    desc: 'Shop with confidence — PayPal protection on every single order.',
    href: '/contact',
    color: '#00BCD4',
  },
  {
    icon: Award,
    title: 'Quality Promise',
    desc: '30-day no-questions guarantee. We stand behind every product we sell.',
    href: '/about',
    color: '#8B5CF6',
  },
];

export default function ValuePropositions() {
  return (
    <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
      <div className="container">
        <div className="value-props-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
        }}>
          {values.map(({ icon: Icon, title, desc, href, color }) => (
            <div key={title} className="card" style={{
              padding: '2rem 1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: `${color}15`,
                color: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}>
                <Icon size={28} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-heading)', fontWeight: 700,
                fontSize: '1.125rem', color: '#0F1923', marginBottom: '0.5rem',
              }}>
                {title}
              </h3>
              <p style={{
                fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7,
                marginBottom: '1rem', flex: 1,
              }}>
                {desc}
              </p>
              <Link href={href} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                fontSize: '0.8125rem', fontWeight: 600,
                color: color,
                textDecoration: 'none',
                transition: 'gap 0.2s ease',
                padding: '0.375rem 0',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '0.625rem'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '0.375rem'; }}
              >
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile: 2-col grid */}
        <style>{`
          @media (max-width: 1024px) {
            .value-props-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 480px) {
            .value-props-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
