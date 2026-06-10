"use client";

import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { value: "popularity", label: "Popular" },
  { value: "date", label: "Newest" },
  { value: "price", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("orderby") ?? "popularity";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("orderby", e.target.value);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#0F1923] outline-none focus:ring-2 focus:ring-[#F5811F]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
