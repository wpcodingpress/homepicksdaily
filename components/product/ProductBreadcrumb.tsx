import Link from "next/link";
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
    <nav className="flex items-center gap-2 text-sm text-ink-muted">
      <Link href="/" className="hover:text-brand-orange-500">
        Home
      </Link>
      <span>/</span>
      <Link href="/shop" className="hover:text-brand-orange-500">
        Shop
      </Link>
      {primary && (
        <>
          <span>/</span>
          <Link
            href={`/category/${primary.slug}`}
            className="hover:text-brand-orange-500"
          >
            {decodeHtml(primary.name)}
          </Link>
        </>
      )}
      <span>/</span>
      <span className="text-ink line-clamp-1">{productName}</span>
    </nav>
  );
}
