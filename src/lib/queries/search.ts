import { db } from '@/lib/db';
import { listings, categoryEnum } from '@/lib/db/schema';
import { sql, desc, asc, and, eq, SQL } from 'drizzle-orm';

export interface SearchParams {
  query?: string | null;
  role?: string | null;
  location?: string | null;
}

/**
 * Search and filter listings using PostgreSQL full-text search
 *
 * Features:
 * - Full-text search on search_vector column using plainto_tsquery
 * - Relevance ranking with ts_rank when searching
 * - Category (role) filtering
 * - Location text matching (Phase 1 - simple ILIKE, Phase 2 will add PostGIS radius)
 * - Typo tolerance using trigram similarity as fallback
 * - Only returns approved listings
 */
export async function searchListings(params: SearchParams = {}) {
  const { query, role, location } = params;

  // Build WHERE conditions
  const conditions: SQL[] = [
    eq(listings.status, 'approved')
  ];

  // Add role filter if provided
  if (role && role !== 'all') {
    const validRoles = categoryEnum.enumValues;
    if (validRoles.includes(role as typeof validRoles[number])) {
      conditions.push(eq(listings.role, role as typeof validRoles[number]));
    }
  }

  // Add location filter if provided (simple text match for Phase 1)
  if (location) {
    conditions.push(
      sql`${listings.address} ILIKE ${`%${location}%`}`
    );
  }

  // If search query provided, use full-text search
  if (query && query.trim().length > 0) {
    const searchQuery = query.trim();

    // Try full-text search first
    const results = await db
      .select()
      .from(listings)
      .where(
        and(
          ...conditions,
          sql`${listings.searchVector} @@ plainto_tsquery('english', ${searchQuery})`
        )
      )
      .orderBy(
        desc(sql`ts_rank(${listings.searchVector}, plainto_tsquery('english', ${searchQuery}))`)
      )
      .limit(100);

    // If no results, try typo tolerance with trigram similarity
    if (results.length === 0) {
      const fallbackResults = await db
        .select()
        .from(listings)
        .where(
          and(
            ...conditions,
            sql`similarity(${listings.name}, ${searchQuery}) > 0.3`
          )
        )
        .orderBy(
          desc(sql`similarity(${listings.name}, ${searchQuery})`)
        )
        .limit(100);

      return fallbackResults;
    }

    return results;
  }

  // No search query - just apply filters and return by name
  const results = await db
    .select()
    .from(listings)
    .where(and(...conditions))
    .orderBy(asc(listings.name))
    .limit(100);

  return results;
}

/**
 * Helper function for filter-only queries (no search text)
 * Delegates to searchListings with appropriate params
 */
export async function filterListings(params: Omit<SearchParams, 'query'>) {
  return searchListings({ ...params, query: null });
}
