'use client';
import { useEffect, useRef, useState } from 'react';
import { Package, Users, MapPin, Star } from 'lucide-react';

const stats = [
  { icon: Package, target: 500, suffix: '+', label: 'Products' },
  { icon: Users, target: 10000, suffix: '+', label: 'Happy Customers' },
  { icon: MapPin, target: 50, suffix: '+', label: 'Countries Served' },
  { icon: Star, target: 49, suffix: '★', label: 'Average Rating', decimal: true },
];

function CountUp({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { setStarted(true); obs.unobserve(el); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, duration / steps);
    return () => clearInterval(t);
  }, [started, target]);

  const display = decimal ? (count / 10).toFixed(1) : count;

  return <span ref={ref} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: '#F5811F' }}>{display}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section style={{ background: '#0F1923', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ color: '#00BCD4', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                <s.icon size={32} />
              </div>
              <CountUp target={s.target} suffix={s.suffix} decimal={s.decimal} />
              <p style={{ marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
