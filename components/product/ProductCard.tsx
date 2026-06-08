import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ShoppingCart, ChevronRight } from "lucide-react";
import { extractMinPrice } from "@/lib/utils";
import type { WCProduct } from "@/lib/types";

interface ProductCardProps {
  product: WCProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl =
    product.images?.[0]?.src ??
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&auto=format&fit=crop";

  return (
    <article className="group relative rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-gray-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {product.on_sale && (
          <span className="absolute left-3 top-3 rounded-full bg-[#FF5722] px-2 py-1 text-xs font-bold text-white">
            SALE
          </span>
        )}
        {product.featured && !product.on_sale && (
          <span className="absolute left-3 top-3 rounded-full bg-[#00BCD4] px-2 py-1 text-xs font-bold text-white">
            FEATURED
          </span>
        )}

        <button
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-label="Add to wishlist"
        >
          <Heart className="h-4 w-4 text-gray-400 transition-colors hover:text-red-500" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <Link
            href={`/shop/${product.slug}`}
            className="flex items-center justify-center gap-2 bg-[#FF5722] py-3 text-center text-sm font-semibold text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            {product.type === "variable" ? "View Options" : "Add to Cart"}
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.round(parseFloat(product.average_rating || "0"))
                  ? "fill-[#FFC107] text-[#FFC107]"
                  : "text-gray-200"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-400">
            ({product.rating_count || 0})
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 min-h-[40px] text-sm font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          {product.type === "variable" ? (
            <span className="text-base font-bold text-[#FF5722]">
              From ${extractMinPrice(product.price_html)}
            </span>
          ) : (
            <span className="text-base font-bold text-[#FF5722]">
              ${parseFloat(product.price || "0").toFixed(2)}
            </span>
          )}
          <Link
            href={`/shop/${product.slug}`}
            className="text-[#00BCD4] transition-colors hover:text-[#0097A7]"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
