import type { Listing } from '@/types';

/**
 * Generate Schema.org LocalBusiness JSON-LD for a listing.
 * Used for Google rich results and structured data.
 */
export function generateListingSchema(listing: Listing) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.description || undefined,
    telephone: listing.phone || undefined,
    email: listing.email || undefined,
    url: listing.website || undefined,
    image: listing.imageUrl || undefined,
  };

  // Address
  if (listing.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: 'Louisville',
      addressRegion: 'KY',
      addressCountry: 'US',
    };
  }

  // Geo coordinates from PostGIS
  if (listing.location) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: listing.location,
      longitude: listing.location,
    };
  }

  // Remove undefined values
  return JSON.parse(JSON.stringify(schema));
}
