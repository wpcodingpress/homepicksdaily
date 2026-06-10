'use client';
import { useState, useEffect } from 'react';
import { Truck, Shield, Zap, X } from 'lucide-react';

const messages = [
  { icon: Truck, text: 'Free shipping on orders over $50' },
  { icon: Shield, text: '30-day money-back guarantee' },
  { icon: Zap, text: 'Same-day dispatch on all orders' },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % messages.length), 4000);
    return () => clearInterval(id);
  }, []);

  if (dismissed) return null;

  const { icon: Icon, text } = messages[index];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #F5811F, #E06B0A)',
      color: 'white',
      fontSize: '0.8125rem',
      fontWeight: 500,
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Shimmer */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 4s ease-in-out infinite',
      }} />
      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', position:'relative', zIndex:1 }}>
        <Icon size={14} />
        <span>{text}</span>
      </div>
      <button
        onClick={() => setDismissed(true)}
        style={{
          position:'absolute', right:'1rem', top:'50%', transform:'translateY(-50%)',
          color:'rgba(255,255,255,0.7)',
          zIndex:1,
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
