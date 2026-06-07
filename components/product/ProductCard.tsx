import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Badge from "@/components/ui/Badge";
import ProductPrice from "./ProductPrice";
import { truncateTitle } from "@/lib/utils";
import type { WCProduct } from "@/lib/types";

interface ProductCardProps {
  product: WCProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.src ?? "/images/product-placeholder.jpg";

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col rounded-xl bg-white p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-surface-muted">
        <ImageWithFallback
          src={imageUrl}
          alt={product.name}
          fill
          className="transition-transform group-hover:scale-105"
        />
        {product.on_sale && (
          <Badge variant="sale" className="absolute left-2 top-2">
            Sale
          </Badge>
        )}
        {product.stock_status === "outofstock" && (
          <Badge variant="outofstock" className="absolute left-2 top-2">
            Out of Stock
          </Badge>
        )}
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1">
        <h3 className="text-sm font-semibold text-ink line-clamp-2">
          {truncateTitle(product.name)}
        </h3>
        <ProductPrice
          price={product.price}
          regularPrice={product.regular_price}
          salePrice={product.sale_price}
          onSale={product.on_sale}
          priceHtml={product.price_html}
          type={product.type}
        />
      </div>

      <div className="mt-3 overflow-hidden rounded-lg">
        <div className="flex items-center justify-center rounded-lg bg-brand-orange-500 py-2.5 text-sm font-bold text-white transition-all group-hover:bg-brand-orange-600">
          {product.type === "variable" ? "View Options" : "Add to Cart"}
        </div>
      </div>
    </Link>
  );
}
