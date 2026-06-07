"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchFormProps {
  initialQuery: string;
}

export default function SearchForm({ initialQuery }: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-lg border border-surface-muted px-4 py-3 text-ink placeholder:text-ink-light focus:ring-2 focus:ring-brand-orange-500"
      />
      <button
        type="submit"
        className="rounded-lg bg-brand-orange-500 px-6 py-3 font-bold text-white transition-colors hover:bg-brand-orange-600"
      >
        Search
      </button>
    </form>
  );
}
