'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchForm({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', maxWidth: '480px' }}>
      <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..."
        style={{
          flex: 1, padding: '0.75rem 1rem', borderRadius: '0.75rem',
          border: '2px solid #E2E8F0', fontSize: '0.9375rem', outline: 'none',
          fontFamily: 'var(--font-body)',
        }} />
      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
        <Search size={18} /> Search
      </button>
    </form>
  );
}
