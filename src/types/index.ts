import { InferSelectModel } from 'drizzle-orm';
import { listings } from '@/lib/db/schema';

// DIR-03 Category Taxonomy - 10 approved categories
export type Category =
  | 'Builder'
  | 'Craftsperson'
  | 'Tradesperson'
  | 'Developer'
  | 'Investor'
  | 'Advocate'
  | 'Architect'
  | 'Government'
  | 'Nonprofit'
  | 'Educator';

// Listing type inferred from Drizzle schema
export type Listing = InferSelectModel<typeof listings>;

// Portfolio project interface
export interface ListingProject {
  title: string;
  description: string;
  imageUrl?: string;
}

// Search parameters interface for URL query params
export interface SearchParams {
  category?: Category;
  search?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
}

// Listing status type
export type ListingStatus = 'draft' | 'pending' | 'approved' | 'rejected';
