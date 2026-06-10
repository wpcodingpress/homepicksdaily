import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | HomePicksDaily',
  description: 'Get in touch with our team. We are here to help.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We're here to help. Reach out anytime."
        backgroundImage="/contact-page-header.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <section className="section">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'4rem' }}>
            {/* Info */}
            <div>
              <h2 style={{ fontFamily:'var(--font-heading)', fontSize:'1.75rem', fontWeight:800, marginBottom:'2rem' }}>
                Get in Touch
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
                {[
                  { icon: Mail, label:'Email Us', value:'hi@homepicksdaily.com', color:'#F5811F' },
                  { icon: Phone, label:'Call Us', value:'+1 (555) 123-4567', color:'#1B3F72' },
                  { icon: Clock, label:'Business Hours', value:'Mon–Fri, 9am–6pm EST', color:'#22C55E' },
                  { icon: MapPin, label:'Our Location', value:'Global — We ship worldwide', color:'#EF4444' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} style={{
                    display:'flex', alignItems:'flex-start', gap:'1rem',
                    padding:'1.25rem', background:'white', borderRadius:'1rem',
                    border:'1px solid var(--color-light-border)',
                    boxShadow:'0 2px 12px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{
                      width:'44px', height:'44px', borderRadius:'0.75rem',
                      background:`${color}15`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      flexShrink:0,
                    }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily:'var(--font-heading)', fontWeight:700, fontSize:'0.875rem', color:'var(--color-text-muted)', marginBottom:'0.25rem' }}>
                        {label}
                      </div>
                      <div style={{ fontFamily:'var(--font-body)', fontWeight:500, color:'var(--color-text)' }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{
              background:'white', borderRadius:'1.5rem', padding:'2.5rem',
              border:'1px solid var(--color-light-border)',
              boxShadow:'0 8px 40px rgba(0,0,0,0.06)',
            }}>
              <h3 style={{ fontFamily:'var(--font-heading)', fontSize:'1.5rem', fontWeight:800, marginBottom:'2rem' }}>
                Send us a Message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
