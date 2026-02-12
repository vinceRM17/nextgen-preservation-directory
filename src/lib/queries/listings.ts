import { db, listings } from '@/lib/db';
import { eq, asc } from 'drizzle-orm';
import type { Listing } from '@/types';

/**
 * Get all approved listings for public browsing
 * Returns listings ordered by name ascending
 * Only includes approved listings per DIR-01 requirement
 */
export async function getListings(): Promise<Listing[]> {
  try {
    const result = await db
      .select({
        id: listings.id,
        name: listings.name,
        role: listings.role,
        specialties: listings.specialties,
        address: listings.address,
        phone: listings.phone,
        email: listings.email,
        website: listings.website,
        imageUrl: listings.imageUrl,
        description: listings.description,
        location: listings.location,
        projects: listings.projects,
        status: listings.status,
        createdAt: listings.createdAt,
        updatedAt: listings.updatedAt,
        searchVector: listings.searchVector,
      })
      .from(listings)
      .where(eq(listings.status, 'approved'))
      .orderBy(asc(listings.name));

    return result;
  } catch (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
}

/**
 * Get a single listing by ID
 * Returns null if not found or not approved
 * Includes full details including portfolio projects
 */
export async function getListing(id: string): Promise<Listing | null> {
  try {
    const result = await db
      .select()
      .from(listings)
      .where(eq(listings.id, id))
      .limit(1);

    // Return null if not found or not approved
    if (result.length === 0 || result[0].status !== 'approved') {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error(`Error fetching listing ${id}:`, error);
    return null;
  }
}
