"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ActiveFilterTags() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const tags: Array<{ label: string; href: string }> = [];

  const cat = params.get("category");
  if (cat) {
    params.delete("category");
    tags.push({ label: `Category: ${cat}`, href: `/shop?${params.toString()}` });
    params.set("category", cat);
  }

  const min = params.get("min_price");
  const max = params.get("max_price");
  if (min || max) {
    params.delete("min_price");
    params.delete("max_price");
    tags.push({
      label: `Price: ${min ?? "$0"}–${max ?? "any"}`,
      href: `/shop?${params.toString()}`,
    });
  }

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-ink-muted">Filters:</span>
      {tags.map((tag) => (
        <Link
          key={tag.label}
          href={tag.href}
          className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1 text-sm text-ink-muted transition-colors hover:bg-surface-muted/80"
        >
          {tag.label}
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      ))}
    </div>
  );
}
