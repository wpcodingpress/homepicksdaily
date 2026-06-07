import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "@/components/product/ProductGrid";

export default async function BestsellerGrid() {
  const { products } = await getProducts({
    per_page: "8",
    orderby: "popularity",
  });

  return (
    <section className="bg-surface-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-ink">
            Bestsellers
          </h2>
          <p className="mt-2 text-ink-muted">
            Our most popular eco-friendly picks
          </p>
        </div>
        <ProductGrid products={products} />
        <div className="mt-8 text-center">
          <a
            href="/shop"
            className="inline-block rounded-lg bg-brand-orange-500 px-8 py-3 font-bold text-white transition-colors hover:bg-brand-orange-600"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}
