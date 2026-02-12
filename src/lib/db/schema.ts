import { pgTable, uuid, varchar, text, timestamp, pgEnum, jsonb, customType, index } from 'drizzle-orm/pg-core';

// DIR-03 Category Taxonomy - 10 approved categories
export const categoryEnum = pgEnum('category', [
  'Builder',
  'Craftsperson',
  'Tradesperson',
  'Developer',
  'Investor',
  'Advocate',
  'Architect',
  'Government',
  'Nonprofit',
  'Educator',
]);

// Listing status workflow
export const statusEnum = pgEnum('status', [
  'draft',
  'pending',
  'approved',
  'rejected',
]);

// Custom PostGIS geometry type
const geometry = customType<{ data: string; driverData: string }>({
  dataType() {
    return 'geometry(Point, 4326)';
  },
});

// Custom tsvector type for full-text search
const tsvector = customType<{ data: string; driverData: string }>({
  dataType() {
    return 'tsvector';
  },
});

// Main listings table
export const listings = pgTable('listings', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  role: categoryEnum('role').notNull(), // DIR-03 category taxonomy enforcement
  specialties: text('specialties').array(),
  address: varchar('address', { length: 500 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  website: varchar('website', { length: 500 }),
  imageUrl: varchar('image_url', { length: 500 }),
  // PostGIS geometry column for geospatial data (Point with SRID 4326 - WGS84)
  location: geometry('location'),
  // Portfolio/projects as JSONB array
  projects: jsonb('projects').$type<Array<{
    title: string;
    description: string;
    imageUrl?: string;
  }>>(),
  status: statusEnum('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  // Full-text search vector
  searchVector: tsvector('search_vector'),
}, (table) => ({
  // GiST index for geospatial queries
  locationIdx: index('location_idx').using('gist', table.location),
  // GIN index for full-text search
  searchVectorIdx: index('search_vector_idx').using('gin', table.searchVector),
  // Index on category for filtering
  roleIdx: index('role_idx').on(table.role),
}));

export type Listing = typeof listings.$inferSelect;
export type NewListing = typeof listings.$inferInsert;
