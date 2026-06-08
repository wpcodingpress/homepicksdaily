'use client';
import { Leaf, Truck, Shield, Award, RefreshCw, Users } from 'lucide-react';

const items = [
  { icon: Leaf, label: '100% Eco-Friendly' },
  { icon: Truck, label: 'Free Shipping Over $50' },
  { icon: Shield, label: 'Secure Checkout' },
  { icon: Award, label: 'Premium Quality' },
  { icon: RefreshCw, label: 'Easy Returns' },
  { icon: Users, label: '10k+ Happy Customers' },
];

export default function MarqueeBanner() {
  return (
    <div style={{
      background:'#FF5722',
      overflow:'hidden',
      padding:'0.75rem 0',
    }}>
      <div style={{
        display:'flex',
        gap:'3rem',
        animation:'marquee 28s linear infinite',
        width:'max-content',
      }}>
        {[...items, ...items].map(({ icon: Icon, label }, i) => (
          <div key={i} style={{
            display:'flex',
            alignItems:'center',
            gap:'0.625rem',
            whiteSpace:'nowrap',
          }}>
            <Icon size={18} color="white" />
            <span style={{
              color:'white',
              fontWeight:600,
              fontSize:'0.875rem',
              fontFamily:'var(--font-heading)',
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
