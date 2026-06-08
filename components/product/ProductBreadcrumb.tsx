import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { decodeHtml } from "@/lib/utils";

interface ProductBreadcrumbProps {
  categories: Array<{ id: number; name: string; slug: string }>;
  productName: string;
}

export default function ProductBreadcrumb({
  categories,
  productName,
}: ProductBreadcrumbProps) {
  const primary = categories.find((c) => c.slug !== "uncategorized") ?? categories[0];

  return (
    <nav className="flex items-center gap-2 text-sm text-[#6B7280]">
      <Link href="/" className="transition-colors hover:text-[#FF5722]">
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link href="/shop" className="transition-colors hover:text-[#FF5722]">
        Shop
      </Link>
      {primary && (
        <>
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/category/${primary.slug}`}
            className="transition-colors hover:text-[#FF5722]"
          >
            {decodeHtml(primary.name)}
          </Link>
        </>
      )}
      <ChevronRight className="w-4 h-4" />
      <span className="text-[#1C1C2E] line-clamp-1">{productName}</span>
    </nav>
  );
}
