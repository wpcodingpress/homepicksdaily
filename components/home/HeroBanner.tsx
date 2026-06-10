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
    title: 'Welcome to HomePicksDaily',
    subtitle: 'We keep it fresh, neat, and vibrant all year round.',
    cta: 'Shop Now',
    href: '/shop',
  },
  {
    title: 'Clean Home, Green Planet',
    subtitle: 'Plant-based formulas that work. No harsh chemicals, just pure cleaning power.',
    cta: 'Explore Cleaning',
    href: '/shop?category=cleaning',
    bg: '#0F1923',
  },
  {
    title: 'Sustainable Kitchen Essentials',
    subtitle: 'Replace single-use with reusable. Beautiful, durable, and planet-friendly.',
    cta: 'Shop Kitchen',
    href: '/shop?category=kitchen',
    bg: '#1B3F72',
  },
];

export default function HeroBanner() {
  return (
    <section style={{ position: 'relative', width: '100%', height: 'clamp(340px, 60vw, 600px)', overflow: 'hidden' }}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        style={{ width: '100%', height: '100%' }}
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              {/* Slide 1 — use local brand images */}
              {i === 0 ? (
                <>
                  <div className="hidden md:block" style={{ position:'absolute', inset:0, zIndex:0 }}>
                    <Image
                      src="/home-page-header-desktop.gif"
                      alt="HomePicksDaily — All-In Home Products"
                      fill
                      className="object-cover object-center"
                      priority
                      quality={95}
                    />
                    <div style={{
                      position:'absolute', inset:0,
                      background:'linear-gradient(to right, rgba(27,63,114,0.88) 0%, rgba(27,63,114,0.6) 50%, rgba(27,63,114,0.1) 100%)',
                    }} />
                  </div>
                  <div className="md:hidden" style={{ position:'absolute', inset:0, zIndex:0 }}>
                    <Image
                      src="/home-page-header-mobile.jpg"
                      alt="HomePicksDaily"
                      fill
                      className="object-cover object-top"
                      priority
                      quality={95}
                    />
                    <div style={{
                      position:'absolute', inset:0,
                      background:'linear-gradient(to bottom, rgba(27,63,114,0.5) 0%, rgba(27,63,114,0.88) 60%, rgba(27,63,114,0.95) 100%)',
                    }} />
                  </div>
                </>
              ) : (
                /* Slides 2 & 3 — use dark gradient background */
                <div style={{ position:'absolute', inset:0, background: s.bg, zIndex:0 }} />
              )}

              {/* Content */}
              <div style={{
                position:'absolute', inset:0, zIndex:2,
                display:'flex', alignItems:'center',
                paddingLeft:'clamp(1.5rem, 8vw, 6rem)', paddingRight:'1.5rem',
              }}>
                <div style={{ maxWidth:'560px' }}>
                  <h1 style={{
                    fontFamily:'var(--font-heading)',
                    fontSize:'clamp(1.75rem, 5vw, 3.25rem)',
                    fontWeight:900,
                    color:'white',
                    lineHeight:1.1,
                    marginBottom:'1rem',
                    textShadow:'0 2px 20px rgba(0,0,0,0.3)',
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
                    background:'#F5811F',
                    color:'white',
                    fontFamily:'var(--font-heading)',
                    fontWeight:700,
                    fontSize:'0.9375rem',
                    boxShadow:'0 4px 24px rgba(245,129,31,0.4)',
                    transition:'all 0.25s ease',
                  }}>
                    {s.cta}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
