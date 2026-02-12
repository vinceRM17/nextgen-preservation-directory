import { Suspense } from 'react';
import { searchListings } from '@/lib/queries/search';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterPanel } from '@/components/search/FilterPanel';

export const metadata = {
  title: 'NextGen Preservation Directory - Louisville Historic Preservation',
  description: 'Connect with Louisville\'s historic preservation community. Find builders, craftspeople, architects, and preservation advocates.',
};

interface HomePageProps {
  searchParams?: {
    q?: string;
    role?: string;
    location?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const listings = await searchListings({
    query: searchParams?.q,
    role: searchParams?.role,
    location: searchParams?.location,
  });

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-oswald font-bold mb-4">
          Louisville Historic Preservation Directory
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-lato">
          Connect with Louisville&apos;s historic preservation community. Find builders, craftspeople, architects, and preservation advocates.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-8 space-y-6">
        <SearchBar defaultValue={searchParams?.q} />
        <FilterPanel
          defaultRole={searchParams?.role}
          defaultLocation={searchParams?.location}
        />
      </div>

      {/* Listings Grid with Suspense for loading state */}
      <Suspense fallback={<div className="max-w-6xl mx-auto px-4 text-center text-slate-400">Loading results...</div>}>
        <ListingGrid listings={listings} />
      </Suspense>
    </div>
  );
}
