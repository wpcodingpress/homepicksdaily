'use client';
import { Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  { name: 'Sarah M.', text: 'Completely transformed my cleaning routine. Every product is effective AND eco-friendly. HomePicksDaily is the only store I trust for home essentials now.', initial: 'S' },
  { name: 'James K.', text: 'Shipping was incredibly fast. Products arrived well packaged in eco-friendly materials. The kitchen organizers are absolute game-changers.', initial: 'J' },
  { name: 'Priya R.', text: 'The refillable bottles save me so much money and reduce my plastic waste. Could not be happier. Already recommended to all my friends.', initial: 'P' },
  { name: 'Mike T.', text: 'Ordered once, now I am a regular. Quality is consistently excellent at amazing prices. The 30-day guarantee shows they truly stand behind their products.', initial: 'M' },
  { name: 'Emma L.', text: 'Was hesitant ordering online but the PayPal protection and money-back guarantee gave me confidence. Every single item exceeded my expectations.', initial: 'E' },
];

export default function Testimonials() {
  return (
    <section style={{ background: '#FFFFFF', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-eyebrow">Testimonials</span>
          <h2 className="section-title">What Our Customers Say</h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          loop
          style={{ paddingBottom: '3rem' }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div style={{
                background: 'white', borderRadius: '1.25rem', padding: '1.5rem',
                height: '100%', display: 'flex', flexDirection: 'column',
                border: '1px solid #E2E8F0',
                transition: 'all 0.3s ease',
              }}>
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem' }}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ flex: 1, fontSize: '0.875rem', lineHeight: 1.7, color: '#0F1923', fontStyle: 'italic' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: '#F5811F', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.875rem', fontWeight: 700,
                  }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0F1923' }}>{t.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 500 }}>Verified Buyer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
