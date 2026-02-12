import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'

const DEFAULT_THRESHOLD = 0.4 // 40% similarity — catches "Louisville Masonry" vs "Louisville Masonry Co"

export type SimilarListing = {
  id: string
  name: string
  role: string
  similarity: number
}

/**
 * Find existing approved listings similar to the given name.
 * Uses PostgreSQL pg_trgm extension for trigram-based fuzzy matching.
 *
 * @param name - The name to check for duplicates
 * @param threshold - Minimum similarity score (0-1). Default: 0.4
 * @returns Array of similar listings with similarity scores, ordered by similarity desc
 */
export async function findSimilarListings({
  name,
  threshold = DEFAULT_THRESHOLD,
}: {
  name: string
  threshold?: number
}): Promise<SimilarListing[]> {
  try {
    const result = await db.execute<{
      id: string
      name: string
      role: string
      name_similarity: string
    }>(sql`
      SELECT
        id,
        name,
        role,
        similarity(name, ${name}) as name_similarity
      FROM listings
      WHERE
        status = 'approved'
        AND similarity(name, ${name}) > ${threshold}
      ORDER BY name_similarity DESC
      LIMIT 5
    `)

    // drizzle-orm/postgres-js returns results directly as an array (no .rows)
    return result.map(row => ({
      id: row.id,
      name: row.name,
      role: row.role,
      similarity: parseFloat(row.name_similarity),
    }))
  } catch (error) {
    console.error('Duplicate detection error:', error)
    // Don't block submission on duplicate check failure
    return []
  }
}

/**
 * Check if a submission is a likely duplicate.
 * Returns the most similar listing if similarity > high threshold.
 */
export async function checkForDuplicate(name: string): Promise<SimilarListing | null> {
  const similar = await findSimilarListings({ name, threshold: 0.7 })
  return similar.length > 0 ? similar[0] : null
}
