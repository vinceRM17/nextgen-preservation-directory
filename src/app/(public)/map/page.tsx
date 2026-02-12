import { Metadata } from 'next';
import { MapView } from '@/components/map/MapView';
import { getAllListingsWithCoordinates } from '@/lib/queries/geo';

export const metadata: Metadata = {
  title: 'Map View - NextGen Preservation Collab Directory',
  description:
    'Explore Louisville preservation stakeholders on an interactive map. Find builders, craftspeople, architects, and advocates near you.',
};

export default async function MapPage() {
  const listings = await getAllListingsWithCoordinates();

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-oswald font-semibold mb-4">
          Map View
        </h1>
        <p className="text-slate-600 font-lato mb-4">
          Explore Louisville&apos;s preservation stakeholders on the map.
          Click markers for details.
        </p>
      </div>
      <MapView listings={listings} className="h-[500px] lg:h-[calc(100vh-280px)] w-full" />
    </div>
  );
}
