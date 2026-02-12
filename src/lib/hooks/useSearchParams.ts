'use client';

import { useRouter, useSearchParams as useNextSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Custom hook for managing URL search parameters
 * Wraps Next.js useSearchParams and useRouter for easier param updates
 */
export function useSearchParams() {
  const router = useRouter();
  const searchParams = useNextSearchParams();

  const updateSearchParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (value === null || value === '' || value === 'all') {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const queryString = params.toString();
      const newUrl = queryString ? `?${queryString}` : '/';

      router.push(newUrl);
    },
    [router, searchParams]
  );

  return {
    searchParams,
    updateSearchParam,
  };
}
