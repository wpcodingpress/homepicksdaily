"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Package, Truck } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    badge: "ECO CERTIFIED 2026",
    title: "A Cleaner Home,\nA Greener Future",
    subtitle: "500+ sustainable home essentials for every room. Curated for quality, designed for the planet.",
    cta: { label: "Shop Now", href: "/shop" },
    secondary: { label: "Explore Categories", href: "/category/home-garden" },
    gradient: "linear-gradient(135deg, #1C1C2E 0%, #2E2E42 50%, #1C1C2E 100%)",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop",
    stats: [
      { icon: <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />, label: "4.9 Rating" },
      { icon: <Package className="w-4 h-4" />, label: "500+ Products" },
      { icon: <Truck className="w-4 h-4" />, label: "Free Shipping" },
    ],
  },
  {
    badge: "KITCHEN ESSENTIALS",
    title: "Organize Your Kitchen,\nLove Your Home",
    subtitle: "Reusable storage, bamboo essentials, and eco-friendly tools for a sustainable kitchen.",
    cta: { label: "Shop Kitchen", href: "/category/kitchen-starter-kits" },
    secondary: { label: "View All", href: "/shop" },
    gradient: "linear-gradient(135deg, #0097A7 0%, #00BCD4 50%, #0097A7 100%)",
    image: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80&auto=format&fit=crop",
    stats: [
      { icon: <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />, label: "Eco Materials" },
      { icon: <Package className="w-4 h-4" />, label: "200+ Items" },
      { icon: <Truck className="w-4 h-4" />, label: "Fast Dispatch" },
    ],
  },
  {
    badge: "FREE SHIPPING OFFER",
    title: "Free Shipping\nOn Orders Over $50",
    subtitle: "Plus a 30-day money-back guarantee. Start your eco journey today with zero risk.",
    cta: { label: "Claim Offer", href: "/shop" },
    secondary: { label: "Learn More", href: "/about" },
    gradient: "linear-gradient(135deg, #FF5722 0%, #FF7043 50%, #FF5722 100%)",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1200&q=80&auto=format&fit=crop",
    stats: [
      { icon: <Star className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />, label: "Best Value" },
      { icon: <Package className="w-4 h-4" />, label: "Always Fresh" },
      { icon: <Truck className="w-4 h-4" />, label: "Tracked Delivery" },
    ],
  },
];

export default function HeroBanner() {
  const swiperRef = useRef<{ realIndex: number } | null>(null);

  return (
    <section className="relative">
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.4;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: #FF5722;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.15);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255,255,255,0.25);
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        onSlideChange={(swiper) => { swiperRef.current = { realIndex: swiper.realIndex }; }}
        className="w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative min-h-[600px] overflow-hidden lg:min-h-screen"
              style={{ background: slide.gradient }}
            >
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover opacity-30 lg:opacity-40"
                  priority={idx === 0}
                  loading={idx === 0 ? undefined : "lazy"}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

              <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center px-4 py-16 sm:px-6 lg:flex-row lg:px-8 lg:py-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${idx}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 text-center lg:text-left"
                  >
                    <span className="inline-block rounded-full bg-[#00BCD4] px-4 py-1.5 text-xs font-bold text-white">
                      {slide.badge}
                    </span>

                    <h1 className="mt-6 font-heading text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1] whitespace-pre-line">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mt-4 max-w-lg text-base text-white/70 sm:text-lg lg:mx-0 lg:mt-6">
                      {slide.subtitle}
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                      <Link
                        href={slide.cta.href}
                        className="group inline-flex items-center gap-2 rounded-lg bg-[#FF5722] px-8 py-3.5 text-base font-bold text-white transition-all hover:bg-[#FF7043] hover:shadow-[0_0_24px_rgba(255,87,34,0.5)]"
                      >
                        {slide.cta.label}
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href={slide.secondary.href}
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white hover:bg-white/10"
                      >
                        {slide.secondary.label}
                      </Link>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/60 lg:justify-start">
                      {slide.stats.map((stat, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                          {stat.icon}
                          {stat.label}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  key={`image-${idx}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-12 hidden flex-1 lg:mt-0 lg:block"
                >
                  <div className="relative mx-auto aspect-[4/3] max-w-lg">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="rounded-2xl object-cover shadow-2xl"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
