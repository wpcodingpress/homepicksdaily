import PageHeader from '@/components/ui/PageHeader';
import { Leaf, Award, Users, Heart, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'About Us | HomePicksDaily',
  description: 'Learn about our mission to bring eco-friendly home products to every household.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="We keep it fresh, neat, and vibrant all year round."
        backgroundImage="/about-page-header.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* Mission */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'4rem', alignItems:'center' }}>
            <div>
              <span className="section-eyebrow">Our Mission</span>
              <h2 className="section-title">Making Eco-Friendly Living Easy & Affordable</h2>
              <p style={{ color:'var(--color-text-muted)', lineHeight:1.8, marginBottom:'1.5rem' }}>
                HomePicksDaily was founded with a simple belief: everyone deserves access to high-quality, eco-friendly home products without breaking the bank.
              </p>
              <p style={{ color:'var(--color-text-muted)', lineHeight:1.8, marginBottom:'2rem' }}>
                We curate the best sustainable home and cleaning products from trusted global suppliers, so you can shop confidently knowing every item meets our strict quality and environmental standards.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                {[
                  'Safe for kids, pets, and the entire family',
                  'Refillable and recyclable packaging',
                  'Sourced from eco-certified suppliers',
                  '30-day satisfaction guarantee on every order',
                ].map(item => (
                  <div key={item} style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem' }}>
                    <CheckCircle size={20} style={{ color:'#F5811F', flexShrink:0, marginTop:'2px' }} />
                    <span style={{ fontFamily:'var(--font-body)', color:'var(--color-text)', fontSize:'0.9375rem' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:'relative', borderRadius:'1.5rem', overflow:'hidden', aspectRatio:'4/3' }}>
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80&auto=format&fit=crop"
                alt="Our eco mission"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background:'var(--color-light-muted)' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3rem' }}>
            <span className="section-eyebrow">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1.5rem' }}>
            {[
              { icon: Leaf, title:'Sustainability', desc:'Every product chosen for minimal environmental impact', color:'#22C55E' },
              { icon: Award, title:'Quality First', desc:'Rigorous testing before any product reaches our store', color:'#F5811F' },
              { icon: Users, title:'Community', desc:'10,000+ happy customers and growing every day', color:'#1B3F72' },
              { icon: Heart, title:'Care', desc:'Safe for your family, your pets, and the planet', color:'#EF4444' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ padding:'2rem', textAlign:'center' }}>
                <div style={{
                  width:'64px', height:'64px', borderRadius:'50%',
                  background:`${color}18`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 1.25rem',
                }}>
                  <Icon size={28} style={{ color }} />
                </div>
                <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1.125rem', marginBottom:'0.5rem' }}>
                  {title}
                </h3>
                <p style={{ color:'var(--color-text-muted)', fontSize:'0.9rem', lineHeight:1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
