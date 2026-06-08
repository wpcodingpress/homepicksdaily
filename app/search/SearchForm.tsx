"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-[#1C1C2E] placeholder:text-gray-400 outline-none transition-all focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]"
      />
      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-[#FF5722] px-6 py-3 font-bold text-white transition-colors hover:bg-[#FF7043]"
      >
        <Search className="w-4 h-4" />
        Search
      </button>
    </form>
  );
}
