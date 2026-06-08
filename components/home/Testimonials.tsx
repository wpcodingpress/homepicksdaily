"use client";

import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Completely transformed my cleaning routine. Every product is effective AND eco-friendly. HomePicksDaily is the only store I trust for home essentials now.",
  },
  {
    name: "James K.",
    text: "Shipping was incredibly fast. Products arrived well packaged in eco-friendly materials. The kitchen organizers are absolute game-changers.",
  },
  {
    name: "Priya R.",
    text: "The refillable bottles save me so much money and reduce my plastic waste. Could not be happier. Already recommended to all my friends.",
  },
  {
    name: "Mike T.",
    text: "Ordered once, now I am a regular. Quality is consistently excellent at amazing prices. The 30-day guarantee shows they truly stand behind their products.",
  },
  {
    name: "Emma L.",
    text: "Was hesitant ordering online but the PayPal protection and money-back guarantee gave me confidence. Every single item exceeded my expectations.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#00BCD4]">
            Testimonials
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#1C1C2E] sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <style jsx global>{`
          .testimonial-swiper .swiper-pagination-bullet {
            background: #FF5722;
            opacity: 0.3;
          }
          .testimonial-swiper .swiper-pagination-bullet-active {
            opacity: 1;
          }
        `}</style>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          loop={true}
          className="testimonial-swiper pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#FFC107] text-[#FFC107]" />
                  ))}
                </div>
                <p className="flex-1 text-sm italic leading-relaxed text-[#1C1C2E] line-clamp-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5722] text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1C1C2E]">{t.name}</p>
                    <p className="text-xs text-[#4CAF50]">Verified Buyer</p>
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
