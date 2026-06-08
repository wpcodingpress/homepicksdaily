'use client';
import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: '#0F0F1A', padding: '5rem 0' }}>
      {/* Decorative blurs */}
      <div style={{ position: 'absolute', right: '-100px', top: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: '#00BCD4', opacity: 0.08, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '-100px', bottom: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: '#FF5722', opacity: 0.08, filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container">
        <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Mail size={48} color="#FF5722" />
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '0.75rem' }}>
            Join 10,000+ Happy Homes
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.0625rem', marginBottom: '2rem' }}>
            Weekly deals, eco tips, and new arrivals. Zero spam.
          </p>

          {submitted ? (
            <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#FF5722' }}>Thanks for subscribing! Check your inbox.</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', maxWidth: '440px', margin: '0 auto' }}>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: 1, padding: '0.875rem 1.25rem', borderRadius: '0.625rem',
                  border: 'none', outline: 'none', fontSize: '0.9375rem',
                  fontFamily: 'var(--font-body)',
                  background: 'rgba(255,255,255,0.1)', color: 'white',
                }}
              />
              <button type="submit" className="btn btn-primary">
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
          )}

          <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>
            By subscribing you agree to our Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
}
