import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Shield, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about HomePicksDaily — our mission, values, and commitment to eco-friendly home products.",
};

const values = [
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Eco-Friendly First",
    description: "Every product meets our strict sustainability standards. We partner with brands who share our commitment to the planet.",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Quality Guaranteed",
    description: "We personally test every product in our collection. If it doesn't meet our standards, it doesn't make it to our store.",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Customer Obsessed",
    description: "Your satisfaction drives everything we do. From packaging to support, we put our customers first.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-[#1C1C2E] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl font-extrabold text-white sm:text-5xl">
            About HomePicksDaily
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Our mission: make eco-friendly living accessible, affordable, and effortless for every home.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[4px] text-[#00BCD4]">
                Our Mission
              </p>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#1C1C2E] sm:text-4xl">
                A Cleaner Home, A Greener Planet
              </h2>
              <p className="mt-4 leading-relaxed text-[#6B7280]">
                At HomePicksDaily, we believe that a clean home shouldn&apos;t come at
                the cost of a clean planet. We carefully curate every product in our
                collection — from reusable cleaning tools to biodegradable household
                essentials — so you can shop with confidence, knowing each item meets
                our standards for quality and sustainability.
              </p>
              <p className="mt-4 leading-relaxed text-[#6B7280]">
                Whether you&apos;re taking your first steps toward a zero-waste lifestyle
                or looking to replace your current cleaning arsenal with sustainable
                alternatives, HomePicksDaily is here to help.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80&auto=format&fit=crop"
                alt="Eco-friendly mission"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#00BCD4]">
              Our Values
            </p>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#1C1C2E] sm:text-4xl">
              What We Stand For
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5722]/10 text-[#FF5722]">
                  {v.icon}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#1C1C2E]">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-[#6B7280]">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1C1C2E] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&auto=format&fit=crop"
                alt="Our team"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[4px] text-[#00BCD4]">
                Our Team
              </p>
              <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
                Passionate About Sustainability
              </h2>
              <p className="mt-4 leading-relaxed text-white/60">
                We&apos;re a small, dedicated team of eco-enthusiasts based across the
                US. From product sourcing to customer support, every member of our team
                is committed to making sustainable living simple and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
