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
      <p className="text-sm font-bold text-[#F5811F]">
        From {formatPrice(min)}
      </p>
    );
  }

  if (!price) {
    return <p className="text-sm text-[#6B7280]">Price unavailable</p>;
  }

  if (onSale && salePrice) {
    return (
      <div className="flex items-center gap-2">
        <p className="text-2xl font-bold text-[#F5811F]">
          {formatPrice(salePrice)}
        </p>
        <p className="text-sm text-gray-400 line-through">
          {formatPrice(regularPrice)}
        </p>
      </div>
    );
  }

  return (
    <p className="text-2xl font-bold text-[#0F1923]">
      {formatPrice(price)}
    </p>
  );
}
