'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Truck, Star, Package } from 'lucide-react';

const slides = [
  {
    id: 1,
    eyebrow: 'All-In Home Products',
    title: 'We Keep It Fresh,\nNeat & Vibrant',
    subtitle: 'Discover 500+ eco-friendly home essentials. Safe for kids, pets and the planet.',
    cta: { label: 'Shop Now', href: '/shop' },
    cta2: { label: 'View Categories', href: '/shop' },
    desktopImage: '/home-page-header-desktop.gif',
    mobileImage: '/home-page-header-mobile.jpg',
    isGif: true,
  },
  {
    id: 2,
    eyebrow: 'Kitchen Essentials',
    title: 'Organize Your\nKitchen Better',
    subtitle: 'Bamboo, silicone and sustainable tools for a beautifully organized kitchen every day.',
    cta: { label: 'Shop Kitchen', href: '/category/kitchen-starter-kits' },
    cta2: { label: 'All Products', href: '/shop' },
    desktopImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1600&q=90&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=85&auto=format&fit=crop',
    isGif: false,
  },
  {
    id: 3,
    eyebrow: 'Free Shipping Offer',
    title: 'Free Shipping\nOn Orders $50+',
    subtitle: 'Worldwide tracked shipping on every qualifying order. Fast, insured, and reliable.',
    cta: { label: 'Claim Offer', href: '/shop' },
    cta2: { label: 'Learn More', href: '/about' },
    desktopImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&q=90&auto=format&fit=crop',
    mobileImage: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=85&auto=format&fit=crop',
    isGif: false,
  },
];

const GRID_COLS = 6;
const GRID_ROWS = 4;
const TOTAL_BLOCKS = GRID_COLS * GRID_ROWS;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [blocks, setBlocks] = useState<boolean[]>(Array(TOTAL_BLOCKS).fill(false));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    const target = (index + slides.length) % slides.length;
    if (target === current) return;

    setAnimating(true);
    setNext(target);

    const shuffled = Array.from({ length: TOTAL_BLOCKS }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

    shuffled.forEach((blockIndex, i) => {
      setTimeout(() => {
        setBlocks(prev => {
          const n = [...prev];
          n[blockIndex] = true;
          return n;
        });
      }, i * 18);
    });

    setTimeout(() => {
      setCurrent(target);
      setNext(null);
      setBlocks(Array(TOTAL_BLOCKS).fill(false));
      setAnimating(false);
    }, TOTAL_BLOCKS * 18 + 300);
  }, [animating, current]);

  const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(goNext, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [goNext]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, 6000);
  };

  const slide = slides[current];
  const nextSlide = next !== null ? slides[next] : null;

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(500px, 85vh, 820px)',
      overflow: 'hidden',
      background: '#0F1923',
    }}>

      {/* CURRENT SLIDE BACKGROUND */}
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <div className="hidden md:block" style={{ position:'absolute', inset:0 }}>
          <Image
            src={slide.desktopImage}
            alt={slide.title}
            fill
            style={{ objectFit:'cover', objectPosition:'center center' }}
            priority={slide.id === 1}
            quality={95}
            unoptimized={slide.isGif}
          />
        </div>
        <div className="md:hidden" style={{ position:'absolute', inset:0 }}>
          <Image
            src={slide.mobileImage}
            alt={slide.title}
            fill
            style={{ objectFit:'cover', objectPosition:'center top' }}
            priority={slide.id === 1}
            quality={90}
            unoptimized={slide.isGif}
          />
        </div>
      </div>

      {/* NEXT SLIDE BACKGROUND */}
      {nextSlide && (
        <div style={{ position:'absolute', inset:0, zIndex:1 }}>
          <div className="hidden md:block" style={{ position:'absolute', inset:0 }}>
            <Image
              src={nextSlide.desktopImage}
              alt={nextSlide.title}
              fill
              style={{ objectFit:'cover', objectPosition:'center center' }}
              quality={95}
              unoptimized={nextSlide.isGif}
            />
          </div>
          <div className="md:hidden" style={{ position:'absolute', inset:0 }}>
            <Image
              src={nextSlide.mobileImage}
              alt={nextSlide.title}
              fill
              style={{ objectFit:'cover', objectPosition:'center top' }}
              quality={90}
              unoptimized={nextSlide.isGif}
            />
          </div>
        </div>
      )}

      {/* GRID BROKEN ANIMATION BLOCKS */}
      {animating && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
          pointerEvents: 'none',
        }}>
          {blocks.map((active, i) => (
            <div key={i} style={{
              background: active ? 'transparent' : 'rgba(15,25,35,0.97)',
              transition: 'background 0.15s ease',
            }} />
          ))}
        </div>
      )}

      {/* Mobile: bottom-up gradient */}
      <div className="md:hidden" style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to bottom, rgba(15,25,35,0.25) 0%, rgba(15,25,35,0.5) 40%, rgba(15,25,35,0.88) 70%, rgba(15,25,35,0.97) 100%)',
      }} />
      {/* Desktop: left side only gradient */}
      <div className="hidden md:block" style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(to right, rgba(15,25,35,0.92) 0%, rgba(15,25,35,0.75) 35%, rgba(15,25,35,0.2) 60%, transparent 80%)',
      }} />

      {/* SLIDE CONTENT */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        display: 'flex', alignItems: 'center',
      }}>
        <div className="container" style={{ width: '100%' }}>
          <div style={{ maxWidth: '580px' }}>

            {/* Eyebrow */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(245,129,31,0.2)',
              border: '1px solid rgba(245,129,31,0.4)',
              color: '#F5811F',
              padding: '0.4rem 1.1rem',
              borderRadius: '2rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
              backdropFilter: 'blur(8px)',
            }}>
              {slide.eyebrow}
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)',
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.08,
              marginBottom: '1.25rem',
              whiteSpace: 'pre-line',
              textShadow: '0 2px 24px rgba(0,0,0,0.4)',
              letterSpacing: '-0.02em',
            }}>
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              maxWidth: '460px',
              fontFamily: 'var(--font-body)',
            }}>
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.875rem', marginBottom:'2.5rem' }}>
              <Link href={slide.cta.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#F5811F',
                color: 'white',
                padding: '0.9rem 2rem',
                borderRadius: '0.625rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem', fontWeight: 700,
                boxShadow: '0 8px 32px rgba(245,129,31,0.45)',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
              }}>
                {slide.cta.label} <ArrowRight size={18} />
              </Link>
              <Link href={slide.cta2.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.12)',
                color: 'white',
                padding: '0.9rem 2rem',
                borderRadius: '0.625rem',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem', fontWeight: 600,
                border: '1.5px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
              }}>
                {slide.cta2.label}
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '1.25rem',
              padding: '1rem 1.25rem',
              background: 'rgba(0,0,0,0.25)',
              backdropFilter: 'blur(12px)',
              borderRadius: '0.75rem',
              border: '1px solid rgba(255,255,255,0.1)',
              width: 'fit-content',
            }}>
              {[
                { icon: Star, text: '4.9 Rating' },
                { icon: Package, text: '500+ Products' },
                { icon: Truck, text: 'Free Shipping $50+' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                }}>
                  <Icon size={14} style={{ color: '#F5811F' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        onClick={() => { goPrev(); resetTimer(); }}
        style={{
          position: 'absolute', left: '1.25rem', top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={() => { goNext(); resetTimer(); }}
        style={{
          position: 'absolute', right: '1.25rem', top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        aria-label="Next slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* DOT INDICATORS */}
      <div style={{
        position: 'absolute', bottom: '1.75rem', left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        display: 'flex', gap: '0.5rem', alignItems: 'center',
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetTimer(); }}
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#F5811F' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* SLIDE COUNTER */}
      <div style={{
        position: 'absolute', bottom: '1.75rem', right: '1.5rem',
        zIndex: 5,
        color: 'rgba(255,255,255,0.5)',
        fontSize: '0.8125rem',
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        letterSpacing: '0.05em',
      }}>
        <span style={{ color: 'white', fontWeight: 700 }}>{String(current + 1).padStart(2,'0')}</span>
        {' / '}
        {String(slides.length).padStart(2,'0')}
      </div>
    </section>
  );
}
