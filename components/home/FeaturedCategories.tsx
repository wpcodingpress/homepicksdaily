import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/woocommerce";
import { decodeHtml } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const categoryImages: Record<string, string> = {
  "kitchen-starter-kits": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
  "home-storage-organization": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
  "home-garden": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80&auto=format&fit=crop",
  "refill-solutions": "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80&auto=format&fit=crop",
  "toys-hobbies": "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80&auto=format&fit=crop",
  "kitchendining-bar": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop",
};

export default async function FeaturedCategories() {
  const categories = await getCategories();
  const display = categories.slice(0, 5);

  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[4px] text-[#00BCD4]">
            Explore
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-[#1C1C2E] sm:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
          <p className="mt-3 text-[#6B7280]">
            Curated collections for every room in your home
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((cat, i) => {
            const isLarge = i === 0;
            const imgSrc = categoryImages[cat.slug] || categoryImages["default"] || categoryImages["kitchen-starter-kits"];
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-400 ${
                  isLarge ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
                style={{ minHeight: isLarge ? "320px" : "240px" }}
              >
                <Image
                  src={imgSrc}
                  alt={decodeHtml(cat.name)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/90 via-[#1C1C2E]/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                        {decodeHtml(cat.name)}
                      </h3>
                      <p className="mt-1 text-sm text-white/70">
                        {cat.count} product{cat.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-white opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
