"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

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
      <span className="text-sm text-[#6B7280]">Filters:</span>
      {tags.map((tag) => (
        <Link
          key={tag.label}
          href={tag.href}
          className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-[#6B7280] transition-colors hover:bg-gray-200"
        >
          {tag.label}
          <X className="w-3 h-3" />
        </Link>
      ))}
    </div>
  );
}
