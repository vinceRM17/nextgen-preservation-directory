import { Suspense } from 'react';
import { searchListings } from '@/lib/queries/search';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterPanel } from '@/components/search/FilterPanel';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextGen Preservation Collab Directory - Louisville, KY',
  description: 'Find builders, craftspeople, architects, and preservation stakeholders in Louisville\'s historic preservation ecosystem.',
  keywords: 'Louisville preservation, historic renovation, preservation directory, Kentucky heritage, historic buildings',
  openGraph: {
    title: 'NextGen Preservation Collab Directory',
    description: 'Connect with Louisville\'s preservation community. Find builders, craftspeople, and advocates.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NextGen Preservation Collab Directory',
    description: 'Connect with Louisville\'s preservation community.',
  },
};

interface HomePageProps {
  searchParams?: Promise<{
    q?: string;
    role?: string;
    location?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const listings = await searchListings({
    query: params?.q,
    role: params?.role,
    location: params?.location,
  });

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 mb-8 border-t-4 border-amber-500 pt-8">
        <h1 className="text-4xl md:text-5xl font-oswald font-bold mb-4">
          Louisville Historic Preservation Directory
        </h1>
        <p className="text-lg md:text-2xl text-slate-200 font-lato">
          Connect with Louisville&apos;s historic preservation community. Find builders, craftspeople, architects, and preservation advocates.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-8 space-y-6">
        <SearchBar defaultValue={params?.q} />
        <FilterPanel
          defaultRole={params?.role}
          defaultLocation={params?.location}
        />
      </div>

      {/* Listings Grid with Suspense for loading state */}
      <Suspense fallback={<div className="max-w-6xl mx-auto px-4 text-center text-slate-300">Loading results...</div>}>
        <ListingGrid listings={listings} />
      </Suspense>
    </div>
  );
}
