'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'support@homepicksdaily.com' },
  { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Location', value: 'Austin, TX, USA' },
  { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9am–6pm EST' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) { setSent(true); setForm({ name: '', email: '', message: '' }); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem',
    border: '1px solid #E2E8F0', fontSize: '0.9375rem',
    fontFamily: 'var(--font-body)', outline: 'none',
    transition: 'all 0.2s ease',
  };

  return (
    <>
      {/* Hero */}
      <section style={{ background: '#0F0F1A', padding: '5rem 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            Contact Us
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', maxWidth: '560px' }}>
            Have a question? We would love to hear from you. Send us a message and we will respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#0F0F1A', marginBottom: '0.375rem' }}>Name *</label>
                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#0F0F1A', marginBottom: '0.375rem' }}>Email *</label>
                <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.875rem', color: '#0F0F1A', marginBottom: '0.375rem' }}>Message *</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?" style={{ ...inputStyle, resize: 'none' }} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Send size={16} />
                {sent ? 'Message Sent!' : 'Send Message'}
              </button>
              {sent && <p style={{ color: '#10B981', fontWeight: 600, fontSize: '0.875rem' }}>Thanks for reaching out! We will get back to you soon.</p>}
            </form>

            {/* Info cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contactInfo.map(info => (
                <div key={info.label} style={{
                  background: '#0F0F1A', borderRadius: '1rem', padding: '1.5rem',
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'rgba(0,188,212,0.2)', color: '#00BCD4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <info.icon size={24} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>{info.label}</p>
                    <p style={{ fontWeight: 600, color: 'white', fontSize: '0.9375rem' }}>{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
