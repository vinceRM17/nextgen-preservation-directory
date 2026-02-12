import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { listings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextgenpreservationcollab.org';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/map`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Dynamic listing pages
  try {
    const approvedListings = await db
      .select({ id: listings.id, updatedAt: listings.updatedAt })
      .from(listings)
      .where(eq(listings.status, 'approved'));

    const listingPages: MetadataRoute.Sitemap = approvedListings.map((listing) => ({
      url: `${baseUrl}/listings/${listing.id}`,
      lastModified: listing.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...listingPages];
  } catch {
    return staticPages;
  }
}
