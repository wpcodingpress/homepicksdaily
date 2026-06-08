import { getProducts } from "@/lib/woocommerce";
import ProductCard from "./ProductCard";

interface RelatedProductsProps {
  relatedIds: number[];
}

export default async function RelatedProducts({ relatedIds }: RelatedProductsProps) {
  if (!relatedIds || relatedIds.length === 0) return null;

  const { products } = await getProducts({
    include: relatedIds.slice(0, 4).join(","),
    per_page: "4",
  });

  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="mb-6 font-heading text-2xl font-bold text-[#1C1C2E]">
        Related Products
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
