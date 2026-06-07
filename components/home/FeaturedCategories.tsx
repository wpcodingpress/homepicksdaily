import Link from "next/link";
import { getCategories } from "@/lib/woocommerce";
import { decodeHtml } from "@/lib/utils";

const gradients = [
  "linear-gradient(135deg, #0A2540, #2563EB)",
  "linear-gradient(135deg, #FF6B00, #FF8C38)",
  "linear-gradient(135deg, #1A3F6F, #00D4FF)",
  "linear-gradient(135deg, #FF6B00, #2563EB)",
  "linear-gradient(135deg, #0A2540, #00D4FF)",
  "linear-gradient(135deg, #1A3F6F, #FF8C38)",
];

export default async function FeaturedCategories() {
  const categories = await getCategories();
  const display = categories.slice(0, 5);

  return (
    <section className="bg-surface-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[3px] text-brand-orange">
            Shop by Category
          </p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-brand-blue sm:text-4xl">
            Find What Your Home Needs
          </h2>
          <p className="mt-3 text-ink-muted">
            Curated collections for every room in your home
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((cat, i) => {
            const isLarge = i === 0;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  isLarge ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
                style={{ minHeight: isLarge ? "320px" : "200px", background: gradients[i % gradients.length] }}
              >
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                    {decodeHtml(cat.name)}
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    {cat.count} product{cat.count !== 1 ? "s" : ""}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange opacity-0 transition-all group-hover:opacity-100">
                    Shop Now{" "}
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
