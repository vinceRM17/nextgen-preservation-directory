import { z } from 'zod';

// Category values matching the database enum
const categoryValues = [
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
] as const;

// Public submission form validation
export const submissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  organization: z.string().max(255).optional().or(z.literal('')),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .regex(/^[\d\s\-\(\)\+\.]+$/, 'Invalid phone number format')
    .min(7, 'Phone number too short')
    .max(20)
    .optional()
    .or(z.literal('')),
  role: z.enum(categoryValues),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  description: z.string().max(1000, 'Description must be under 1000 characters').optional().or(z.literal('')),
  address: z.string().min(5, 'Please enter a full address'),
});

export type SubmissionFormData = z.infer<typeof submissionSchema>;

// Admin moderation action validation
export const adminActionSchema = z.object({
  submissionId: z.string().uuid(),
  action: z.enum(['approve', 'reject']),
  adminNotes: z.string().max(1000).optional(),
});

export type AdminActionData = z.infer<typeof adminActionSchema>;

// Admin direct listing create/edit validation
export const adminListingSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().optional().or(z.literal('')),
  role: z.enum(categoryValues),
  specialties: z.array(z.string()).min(1),
  address: z.string().max(500).optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  imageUrl: z.string().url().optional().or(z.literal('')),
  status: z.enum(['draft', 'pending', 'approved', 'rejected']).optional(),
});

export type AdminListingData = z.infer<typeof adminListingSchema>;

// Export categoryValues for use in form components
export { categoryValues };
