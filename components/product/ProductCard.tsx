import Link from "next/link";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import Badge from "@/components/ui/Badge";
import { truncateTitle } from "@/lib/utils";
import type { WCProduct } from "@/lib/types";

interface ProductCardProps {
  product: WCProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.images?.[0]?.src ?? "/images/product-placeholder.jpg";

  const priceDisplay = () => {
    if (product.type === "variable" && product.price_html) {
      const min = product.price_html.match(/[\d.]+/g)?.[0] ?? "0";
      return (
        <p className="text-sm font-bold text-brand-blue">
          <span className="text-brand-orange">From</span> ${min}
        </p>
      );
    }
    if (product.on_sale && product.sale_price) {
      return (
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-brand-orange">
            ${parseFloat(product.sale_price).toFixed(2)}
          </p>
          <p className="text-xs text-ink-light line-through">
            ${parseFloat(product.regular_price).toFixed(2)}
          </p>
        </div>
      );
    }
    if (product.price) {
      return (
        <p className="text-sm font-bold text-brand-blue">
          ${parseFloat(product.price).toFixed(2)}
        </p>
      );
    }
    return <p className="text-sm text-ink-muted">Price unavailable</p>;
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-[rgba(10,37,64,0.08)] bg-white shadow-[0_2px_12px_rgba(10,37,64,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(10,37,64,0.15)]"
    >
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-surface-light">
        <ImageWithFallback
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.on_sale && (
          <Badge variant="sale" className="absolute left-3 top-3">
            SALE
          </Badge>
        )}
        {product.stock_status === "outofstock" && (
          <Badge variant="outofstock" className="absolute left-3 top-3">
            OUT OF STOCK
          </Badge>
        )}

        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex items-center justify-center bg-brand-orange py-3 text-sm font-semibold text-white">
            {product.type === "variable" ? "View Options" : "Add to Cart"}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {product.average_rating && parseFloat(product.average_rating) > 0 && (
          <div className="flex items-center gap-1 text-xs text-ink-light">
            <span className="text-brand-orange">
              {"\u2B50".repeat(Math.round(parseFloat(product.average_rating)))}
            </span>
            <span>({product.rating_count})</span>
          </div>
        )}

        <h3 className="text-sm font-semibold text-ink line-clamp-2 leading-snug">
          {truncateTitle(product.name)}
        </h3>

        {priceDisplay()}

        <div className="mt-auto flex items-center gap-2 pt-2">
          <span className="rounded-lg bg-brand-orange/10 px-3 py-1.5 text-xs font-semibold text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
            Add to Cart
          </span>
          <span className="text-xs font-medium text-brand-blue-light transition-colors hover:text-brand-orange">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
