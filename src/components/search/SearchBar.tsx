'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from '@/lib/hooks/useSearchParams';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  defaultValue?: string;
  className?: string;
}

export function SearchBar({ defaultValue = '', className }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const debouncedQuery = useDebounce(query, 300);
  const { updateSearchParam } = useSearchParams();

  // Update URL when debounced query changes
  useEffect(() => {
    updateSearchParam('q', debouncedQuery);
  }, [debouncedQuery, updateSearchParam]);

  // Sync with URL changes (e.g., browser back button)
  useEffect(() => {
    if (defaultValue !== query && !query) {
      setQuery(defaultValue);
    }
  }, [defaultValue, query]);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <label htmlFor="directory-search" className="sr-only">
        Search the preservation directory
      </label>
      <Input
        id="directory-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name, specialty, or keyword..."
        className="pl-10 pr-10"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
