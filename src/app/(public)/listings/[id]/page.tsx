import { notFound } from 'next/navigation';
import { getListing } from '@/lib/queries/listings';
import { ListingDetail } from '@/components/listings/ListingDetail';
import type { Metadata } from 'next';

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    return {
      title: 'Listing Not Found',
    };
  }

  return {
    title: `${listing.name} - ${listing.role} | NextGen Preservation Directory`,
    description: listing.description || `View ${listing.name}'s profile and portfolio in the NextGen Preservation Directory.`,
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = await getListing(id);

  // Show 404 if listing not found or not approved
  if (!listing) {
    notFound();
  }

  return <ListingDetail listing={listing} />;
}
