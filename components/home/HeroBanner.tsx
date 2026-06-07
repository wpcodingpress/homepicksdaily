"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";

const slides = [
  {
    eyebrow: "\u2728 New Collection 2026",
    title: "Transform Your Home,\nProtect Our Planet",
    subtitle:
      "Discover 500+ eco-friendly home essentials. Sustainable, effective, and beautifully designed.",
    cta: { label: "Shop Now \u2192", href: "/shop" },
    secondary: { label: "View Categories", href: "/category/home-garden" },
    gradient: "linear-gradient(135deg, #0A2540 0%, #1A3F6F 50%, #0A2540 100%)",
  },
  {
    eyebrow: "\U0001F3E0 Kitchen Favorites",
    title: "Upgrade Your Kitchen,\nThe Eco Way",
    subtitle:
      "From reusable storage to bamboo essentials — make every meal sustainable.",
    cta: { label: "Shop Kitchen \u2192", href: "/category/kitchen" },
    secondary: { label: "View All", href: "/shop" },
    gradient: "linear-gradient(135deg, #0A2540 0%, #2563EB 50%, #0A2540 100%)",
  },
  {
    eyebrow: "\U0001F389 Free Shipping Offer",
    title: "Free Shipping\nOn Orders Over $50",
    subtitle:
      "Plus a 30-day money-back guarantee. Start your eco journey today with zero risk.",
    cta: { label: "Start Shopping \u2192", href: "/shop" },
    secondary: { label: "Learn More", href: "/about" },
    gradient: "linear-gradient(135deg, #1A3F6F 0%, #FF6B00 50%, #0A2540 100%)",
  },
];

function Particles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.15,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setAnimKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative min-h-[600px] overflow-hidden lg:min-h-screen"
      style={{ background: slide.gradient }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnnouncementBar />
      <Particles />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center px-4 py-16 sm:px-6 lg:flex-row lg:px-8 lg:py-0">
        <div className="flex-1 text-center lg:text-left" key={`content-${current}-${animKey}`}>
          <span className="hero-title inline-block rounded-full bg-brand-orange/20 px-4 py-1.5 text-xs font-semibold text-brand-orange">
            {slide.eyebrow}
          </span>

          <h1 className="hero-title mt-6 font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1] whitespace-pre-line">
            {slide.title}
          </h1>

          <p className="hero-subtitle mx-auto mt-4 max-w-lg text-base text-white/70 sm:text-lg lg:mx-0 lg:mt-6">
            {slide.subtitle}
          </p>

          <div className="hero-ctas mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href={slide.cta.href}
              className="group inline-flex items-center gap-2 rounded-lg bg-brand-orange px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-brand-orange-light hover:shadow-[0_0_24px_rgba(255,107,0,0.5)]"
            >
              {slide.cta.label}
            </Link>
            <Link
              href={slide.secondary.href}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              {slide.secondary.label}
            </Link>
          </div>

          <div className="hero-ctas mt-8 flex items-center justify-center gap-6 text-sm text-white/60 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <span className="text-brand-orange">\u2B50</span> 4.9 Rating
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-brand-cyan">\U0001F69A</span> Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-success">\U0001F512</span> Secure Checkout
            </span>
          </div>
        </div>

        <div className="mt-12 flex-1 lg:mt-0" key={`image-${current}-${animKey}`}>
          <div className="hero-image relative mx-auto aspect-[4/3] max-w-md lg:max-w-lg">
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/5 p-8 backdrop-blur-sm">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-orange/20">
                  <svg className="h-12 w-12 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-white/60">
                  Eco-Friendly Home Essentials
                </p>
              </div>
            </div>

            <div className="absolute -left-4 top-4 rounded-xl bg-brand-cyan/20 px-3 py-2 backdrop-blur-sm">
              <p className="text-xs font-bold text-brand-cyan">ECO CERTIFIED</p>
            </div>
            <div className="absolute -bottom-2 -right-2 rounded-xl bg-white px-4 py-3 shadow-lg">
              <p className="text-sm font-bold text-brand-blue">500+ Products</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-brand-orange" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          aria-label="Next slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
