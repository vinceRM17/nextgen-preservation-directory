import { getListings } from '@/lib/queries/listings';
import { ListingGrid } from '@/components/listings/ListingGrid';

export const metadata = {
  title: 'NextGen Preservation Directory - Louisville Historic Preservation',
  description: 'Connect with Louisville\'s historic preservation community. Find builders, craftspeople, architects, and preservation advocates.',
};

export default async function HomePage() {
  const listings = await getListings();

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

      {/* Listings Grid */}
      <ListingGrid listings={listings} />
    </div>
  );
}
