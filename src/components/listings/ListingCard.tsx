import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import type { Listing } from '@/types';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  // Format specialties - show first 3, add "...more" if there are more
  const displaySpecialties = listing.specialties
    ? listing.specialties.length > 3
      ? `${listing.specialties.slice(0, 3).join(', ')} ...more`
      : listing.specialties.join(', ')
    : null;

  return (
    <Link href={`/listings/${listing.id}`} className="block hover:opacity-90 transition-opacity">
      <Card className="h-full overflow-hidden">
        {listing.imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={listing.imageUrl}
              alt={listing.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-oswald">{listing.name}</CardTitle>
          <CardDescription className="font-lato">{listing.role}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {displaySpecialties && (
            <p className="text-sm text-slate-300 line-clamp-2">
              <span className="font-semibold">Specialties:</span> {displaySpecialties}
            </p>
          )}
          {listing.phone && (
            <p className="text-sm text-slate-300">
              <span className="font-semibold">Phone:</span> {listing.phone}
            </p>
          )}
          {listing.email && (
            <p className="text-sm text-slate-300 truncate">
              <span className="font-semibold">Email:</span> {listing.email}
            </p>
          )}
          {listing.website && (
            <p className="text-sm text-blue-400 hover:underline truncate">
              Visit Website
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
