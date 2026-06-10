import PageHeader from '@/components/ui/PageHeader';
import { Truck, Globe, Clock, Shield, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping Policy | HomePicksDaily',
  description: 'Free shipping on orders over $50. Worldwide tracked shipping with full insurance.',
};

export default function ShippingPage() {
  return (
    <>
      <PageHeader
        title="Shipping Policy"
        subtitle="Fast, reliable, and fully tracked delivery worldwide."
        backgroundImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=90&auto=format&fit=crop"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Shipping Policy' },
        ]}
      />

      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'2rem', marginBottom:'4rem' }}>
            {[
              { icon: Truck, title: 'Free Shipping $50+', desc: 'All orders over $50 qualify for free standard shipping worldwide.', color: '#F5811F' },
              { icon: Globe, title: 'Worldwide Delivery', desc: 'We ship to over 100 countries with full tracking and insurance.', color: '#10B981' },
              { icon: Clock, title: 'Fast Dispatch', desc: 'Orders placed before 2 PM EST ship same day, Monday through Friday.', color: '#00BCD4' },
              { icon: Shield, title: 'Secure Handling', desc: 'Every package is carefully packed and fully insured against damage.', color: '#1B3F72' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ padding:'2rem', textAlign:'center' }}>
                <div style={{
                  width:'64px', height:'64px', borderRadius:'50%',
                  background: `${color}18`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 1.25rem', color,
                }}>
                  <Icon size={28} />
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

          <div style={{ maxWidth:'720px', margin:'0 auto' }}>
            <h2 style={{ fontFamily:'var(--font-heading)', fontWeight:800, fontSize:'1.5rem', marginBottom:'1.5rem' }}>
              Shipping Details
            </h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
              {[
                { title: 'Processing Time', desc: 'All orders are processed within 1–2 business days. Orders placed before 2 PM EST Monday–Friday are dispatched the same day.' },
                { title: 'Shipping Rates', desc: 'Standard shipping is free for all orders over $50. Orders under $50 are charged a flat rate of $5.99. Express shipping is available starting at $12.99.' },
                { title: 'Delivery Times', desc: 'Domestic orders arrive within 3–7 business days. International orders take 7–14 business days depending on the destination and customs clearance.' },
                { title: 'Order Tracking', desc: 'Once your order ships, you will receive a confirmation email with a tracking number. You can track your package in real time through our order tracking page.' },
                { title: 'Customs & Duties', desc: 'International orders may be subject to import duties, taxes, and customs fees, which are the responsibility of the customer.' },
              ].map(({ title, desc }) => (
                <div key={title} style={{ display:'flex', gap:'1rem' }}>
                  <CheckCircle size={20} style={{ color:'#F5811F', flexShrink:0, marginTop:'3px' }} />
                  <div>
                    <h3 style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'1rem', marginBottom:'0.25rem' }}>
                      {title}
                    </h3>
                    <p style={{ color:'var(--color-text-muted)', fontSize:'0.9rem', lineHeight:1.7 }}>
                      {desc}
                    </p>
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
