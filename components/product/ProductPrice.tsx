import { formatPrice } from "@/lib/utils";

interface ProductPriceProps {
  price: string;
  regularPrice: string;
  salePrice: string;
  onSale: boolean;
  priceHtml: string;
  type: string;
}

export default function ProductPrice({
  price,
  regularPrice,
  salePrice,
  onSale,
  priceHtml,
  type,
}: ProductPriceProps) {
  if (type === "variable" && priceHtml) {
    const min = priceHtml.match(/[\d.]+/g)?.[0] ?? "0";
    return (
      <p className="text-sm font-bold text-brand-orange-500">
        From {formatPrice(min)}
      </p>
    );
  }

  if (!price) {
    return <p className="text-sm text-ink-muted">Price unavailable</p>;
  }

  if (onSale && salePrice) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-sm font-bold text-brand-orange-500">
          {formatPrice(salePrice)}
        </p>
        <p className="text-xs text-ink-light line-through">
          {formatPrice(regularPrice)}
        </p>
      </div>
    );
  }

  return (
    <p className="text-sm font-bold text-ink">
      {formatPrice(price)}
    </p>
  );
}
