"use client";

import { useEffect, useRef, useState } from "react";
import { Package, Users, MapPin, Star } from "lucide-react";

const stats = [
  { icon: <Package className="w-8 h-8" />, target: 500, suffix: "+", label: "Products" },
  { icon: <Users className="w-8 h-8" />, target: 10000, suffix: "+", label: "Happy Customers" },
  { icon: <MapPin className="w-8 h-8" />, target: 50, suffix: "+", label: "Countries Served" },
  { icon: <Star className="w-8 h-8" />, target: 49, suffix: "★", label: "Average Rating", isDecimal: true },
];

function CountUp({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target]);

  const display = isDecimal ? (count / 10).toFixed(1) : count;

  return (
    <span ref={ref} className="font-heading text-5xl font-black text-[#FF5722] md:text-6xl">
      {display}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-[#1C1C2E] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-4 flex justify-center text-[#00BCD4]">
                {stat.icon}
              </div>
              <CountUp target={stat.target} suffix={stat.suffix} isDecimal={stat.isDecimal} />
              <p className="mt-2 text-base text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
