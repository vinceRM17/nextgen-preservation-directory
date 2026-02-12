import { db } from '@/lib/db';
import { listings } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

interface MapListing {
  id: string;
  name: string;
  role: string;
  phone: string | null;
  latitude: number;
  longitude: number;
}

/**
 * Get all approved listings with coordinates for map display.
 * Used for initial map load in Phase 1.
 */
export async function getAllListingsWithCoordinates(): Promise<MapListing[]> {
  try {
    const results = await db.execute(sql`
      SELECT
        id,
        name,
        role,
        phone,
        ST_Y(location::geometry) AS latitude,
        ST_X(location::geometry) AS longitude
      FROM listings
      WHERE status = 'approved'
        AND location IS NOT NULL
      ORDER BY name ASC
    `);

    return (results.rows as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      phone: row.phone,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    }));
  } catch (error) {
    console.error('Error fetching listings with coordinates:', error);
    return [];
  }
}

/**
 * Get approved listings within a bounding box for viewport-based filtering.
 * Uses PostGIS ST_MakeEnvelope for efficient spatial queries.
 */
export async function getListingsInBounds(
  north: number,
  south: number,
  east: number,
  west: number
): Promise<MapListing[]> {
  try {
    const results = await db.execute(sql`
      SELECT
        id,
        name,
        role,
        phone,
        ST_Y(location::geometry) AS latitude,
        ST_X(location::geometry) AS longitude
      FROM listings
      WHERE status = 'approved'
        AND location IS NOT NULL
        AND ST_Within(
          location,
          ST_MakeEnvelope(${west}, ${south}, ${east}, ${north}, 4326)
        )
      ORDER BY name ASC
    `);

    return (results.rows as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      phone: row.phone,
      latitude: parseFloat(row.latitude),
      longitude: parseFloat(row.longitude),
    }));
  } catch (error) {
    console.error('Error fetching listings in bounds:', error);
    return [];
  }
}
