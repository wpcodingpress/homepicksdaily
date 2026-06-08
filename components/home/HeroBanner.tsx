'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&q=85',
    alt: 'Eco-friendly home products collection',
    title: 'Welcome to HomePicksDaily',
    subtitle: 'Discover 500+ eco-friendly home and cleaning products. Sustainable, effective, and affordable.',
    cta: 'Shop Now',
    href: '/shop',
    gradient: 'from-[#0F0F1A]/70 via-[#0F0F1A]/30 to-transparent',
  },
  {
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1920&q=85',
    alt: 'Natural cleaning supplies',
    title: 'Clean Home, Green Planet',
    subtitle: 'Plant-based formulas that work. No harsh chemicals, just pure cleaning power.',
    cta: 'Explore Cleaning',
    href: '/shop?category=cleaning',
    gradient: 'from-[#0F0F1A]/70 via-[#0F0F1A]/30 to-transparent',
  },
  {
    img: 'https://images.unsplash.com/photo-1544957974-0f39de51963c?w=1920&q=85',
    alt: 'Sustainable kitchen essentials',
    title: 'Sustainable Kitchen Essentials',
    subtitle: 'Replace single-use with reusable. Beautiful, durable, and planet-friendly.',
    cta: 'Shop Kitchen',
    href: '/shop?category=kitchen',
    gradient: 'from-[#0F0F1A]/70 via-[#0F0F1A]/30 to-transparent',
  },
];

export default function HeroBanner() {
  return (
    <section style={{ position:'relative', width:'100%', height:'clamp(340px, 60vw, 600px)', overflow:'hidden' }}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        style={{ width:'100%', height:'100%' }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div style={{ position:'relative', width:'100%', height:'100%' }}>
              <Image
                src={s.img}
                alt={s.alt}
                fill
                priority={i === 0}
                style={{ objectFit:'cover' }}
              />
              <div style={{
                position:'absolute', inset:0,
                background: `linear-gradient(to right, ${s.gradient})`,
                zIndex:1,
              }} />
              <div style={{
                position:'absolute', inset:0, zIndex:2,
                display:'flex', alignItems:'center',
                paddingLeft:'clamp(1.5rem, 8vw, 6rem)',
                paddingRight:'1.5rem',
              }}>
                <div style={{ maxWidth:'560px' }}>
                  <h1 style={{
                    fontFamily:'var(--font-heading)',
                    fontSize:'clamp(1.75rem, 5vw, 3.25rem)',
                    fontWeight:900,
                    color:'white',
                    lineHeight:1.1,
                    marginBottom:'1rem',
                  }}>
                    {s.title}
                  </h1>
                  <p style={{
                    fontSize:'clamp(0.9375rem, 1.5vw, 1.125rem)',
                    color:'rgba(255,255,255,0.8)',
                    lineHeight:1.7,
                    marginBottom:'1.5rem',
                    maxWidth:'480px',
                  }}>
                    {s.subtitle}
                  </p>
                  <Link href={s.href} style={{
                    display:'inline-flex',
                    alignItems:'center',
                    gap:'0.5rem',
                    padding:'0.875rem 2.25rem',
                    borderRadius:'0.625rem',
                    background:'#FF5722',
                    color:'white',
                    fontFamily:'var(--font-heading)',
                    fontWeight:700,
                    fontSize:'0.9375rem',
                    boxShadow:'0 4px 24px rgba(255,87,34,0.4)',
                    transition:'all 0.25s ease',
                  }}>
                    {s.cta}
                  </Link>
                </div>
              </div>
              {/* Decorative blobs */}
              <div style={{
                position:'absolute', bottom:'2rem', right:'2rem',
                width:'200px', height:'200px',
                borderRadius:'50%',
                background:'radial-gradient(circle, rgba(0,188,212,0.2), transparent 70%)',
                zIndex:1,
                pointerEvents:'none',
              }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
