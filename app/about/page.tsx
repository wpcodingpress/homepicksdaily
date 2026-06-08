import type { Metadata } from 'next';
import Image from 'next/image';
import { Leaf, Shield, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about HomePicksDaily — our mission, values, and commitment to eco-friendly home products.',
};

const values = [
  { icon: Leaf, title: 'Eco-Friendly First', desc: 'Every product meets our strict sustainability standards. We partner with brands who share our commitment to the planet.' },
  { icon: Shield, title: 'Quality Guaranteed', desc: 'We personally test every product in our collection. If it does not meet our standards, it does not make it to our store.' },
  { icon: Heart, title: 'Customer Obsessed', desc: 'Your satisfaction drives everything we do. From packaging to support, we put our customers first.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section style={{ background: '#0F0F1A', padding: '5rem 0' }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            About HomePicksDaily
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.6)', maxWidth: '560px' }}>
            Our mission: make eco-friendly living accessible, affordable, and effortless for every home.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="section-eyebrow">Our Mission</span>
              <h2 className="section-title">A Cleaner Home, A Greener Planet</h2>
              <p style={{ color: '#64748B', lineHeight: 1.8, marginBottom: '1rem' }}>
                At HomePicksDaily, we believe that a clean home should not come at the cost of a clean planet. We carefully curate every product in our collection — from reusable cleaning tools to biodegradable household essentials — so you can shop with confidence, knowing each item meets our standards for quality and sustainability.
              </p>
              <p style={{ color: '#64748B', lineHeight: 1.8 }}>
                Whether you are taking your first steps toward a zero-waste lifestyle or looking to replace your current cleaning arsenal with sustainable alternatives, HomePicksDaily is here to help.
              </p>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '1.25rem', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" alt="Eco-friendly mission" fill style={{ objectFit: 'cover' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#F1F5F9', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-eyebrow">Our Values</span>
            <h2 className="section-title" style={{ margin: '0 auto' }}>What We Stand For</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {values.map(v => (
              <div key={v.title} className="card" style={{ padding: '2rem' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(255,87,34,0.1)', color: '#FF5722',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}>
                  <v.icon size={28} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: '#0F0F1A', marginBottom: '0.75rem' }}>
                  {v.title}
                </h3>
                <p style={{ color: '#64748B', lineHeight: 1.7, fontSize: '0.9375rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: '#0F0F1A', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '1.25rem', overflow: 'hidden' }}>
              <Image src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" alt="Our team" fill style={{ objectFit: 'cover' }} loading="lazy" />
            </div>
            <div>
              <span className="section-eyebrow">Our Team</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                Passionate About Sustainability
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                We are a small, dedicated team of eco-enthusiasts based across the US. From product sourcing to customer support, every member of our team is committed to making sustainable living simple and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
