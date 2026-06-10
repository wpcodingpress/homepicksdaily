'use client';
import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    border: '2px solid var(--color-light-border)',
    borderRadius: '0.625rem',
    fontSize: '0.9375rem',
    fontFamily: 'var(--font-body)',
    color: 'var(--color-text)',
    background: 'var(--color-light-bg)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign:'center', padding:'3rem 1rem' }}>
        <CheckCircle size={56} style={{ color:'#22C55E', margin:'0 auto 1rem' }} />
        <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.5rem', fontWeight:800, marginBottom:'0.75rem' }}>
          Message Sent!
        </h3>
        <p style={{ color:'var(--color-text-muted)' }}>
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
        <div>
          <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.5rem' }}>
            First Name *
          </label>
          <input type="text" required placeholder="John" style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#F5811F')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-light-border)')} />
        </div>
        <div>
          <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.5rem' }}>
            Last Name *
          </label>
          <input type="text" required placeholder="Doe" style={inputStyle}
            onFocus={e => (e.target.style.borderColor = '#F5811F')}
            onBlur={e => (e.target.style.borderColor = 'var(--color-light-border)')} />
        </div>
      </div>
      <div>
        <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.5rem' }}>
          Email Address *
        </label>
        <input type="email" required placeholder="john@example.com" style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#F5811F')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-light-border)')} />
      </div>
      <div>
        <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.5rem' }}>
          Subject
        </label>
        <input type="text" placeholder="How can we help?" style={inputStyle}
          onFocus={e => (e.target.style.borderColor = '#F5811F')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-light-border)')} />
      </div>
      <div>
        <label style={{ display:'block', fontFamily:'var(--font-heading)', fontWeight:600, fontSize:'0.875rem', marginBottom:'0.5rem' }}>
          Message *
        </label>
        <textarea required placeholder="Write your message here..." rows={5} style={{ ...inputStyle, resize:'vertical' }}
          onFocus={e => (e.target.style.borderColor = '#F5811F')}
          onBlur={e => (e.target.style.borderColor = 'var(--color-light-border)')} />
      </div>
      <button type="submit" disabled={loading} style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem',
        background: loading ? '#ccc' : '#F5811F',
        color:'white', padding:'1rem 2rem', borderRadius:'0.625rem',
        fontFamily:'var(--font-heading)', fontSize:'1rem', fontWeight:700,
        border:'none', cursor: loading ? 'not-allowed' : 'pointer',
        transition:'all 0.25s ease',
        boxShadow: loading ? 'none' : '0 4px 20px rgba(245,129,31,0.35)',
      }}>
        {loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
      </button>
    </form>
  );
}
