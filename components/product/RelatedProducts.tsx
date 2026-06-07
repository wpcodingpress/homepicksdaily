import { getProducts } from "@/lib/woocommerce";
import ProductGrid from "./ProductGrid";

interface RelatedProductsProps {
  relatedIds: number[];
}

export default async function RelatedProducts({
  relatedIds,
}: RelatedProductsProps) {
  if (relatedIds.length === 0) return null;

  const { products } = await getProducts({
    include: relatedIds.slice(0, 4).join(","),
    per_page: "4",
  });

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 font-heading text-2xl font-bold text-ink">
        Related Products
      </h2>
      <ProductGrid products={products} />
    </section>
  );
}
