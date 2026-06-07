import Link from "next/link";
import { getCategories } from "@/lib/woocommerce";
import { decodeHtml } from "@/lib/utils";

export default async function FeaturedCategories() {
  const categories = await getCategories();
  const display = categories.slice(0, 6);

  return (
    <section className="bg-surface-light py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-ink">
            Shop by Category
          </h2>
          <p className="mt-2 text-ink-muted">
            Find exactly what your home needs
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {display.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative flex h-40 items-end overflow-hidden rounded-xl bg-brand-blue-500 p-6 transition-shadow hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="relative z-10">
                <h3 className="font-heading text-xl font-bold text-white">
                  {decodeHtml(cat.name)}
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  {cat.count} product{cat.count !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
