import { z } from 'zod';

// DIR-03 Category Taxonomy validation
const categorySchema = z.enum([
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

// Portfolio project schema
const projectSchema = z.object({
  title: z.string().min(1, 'Project title is required'),
  description: z.string().min(1, 'Project description is required'),
  imageUrl: z.string().url().optional(),
});

// Listing status schema
const statusSchema = z.enum(['draft', 'pending', 'approved', 'rejected']);

// Main listing schema
export const listingSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
  description: z.string().optional(),
  role: categorySchema,
  specialties: z.array(z.string()).optional(),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional(),
  email: z.string().email('Invalid email address').max(255, 'Email must be less than 255 characters').optional(),
  website: z.string().url('Invalid website URL').max(500, 'Website must be less than 500 characters').optional(),
  imageUrl: z.string().url('Invalid image URL').max(500, 'Image URL must be less than 500 characters').optional(),
  location: z.string().optional(), // Stored as WKT string (e.g., 'POINT(-85.7585 38.2527)')
  projects: z.array(projectSchema).optional(),
  status: statusSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Search parameters schema
export const searchParamsSchema = z.object({
  category: categorySchema.optional(),
  search: z.string().optional(),
  lat: z.coerce.number().min(-90).max(90).optional(),
  lng: z.coerce.number().min(-180).max(180).optional(),
  radius: z.coerce.number().positive().optional(),
  page: z.coerce.number().positive().optional(),
  limit: z.coerce.number().positive().max(100).optional(),
});

export type ListingInput = z.infer<typeof listingSchema>;
export type SearchParamsInput = z.infer<typeof searchParamsSchema>;
