'use server'

import { db } from '@/lib/db'
import { submissions } from '@/lib/db/schema'
import { submissionSchema } from '@/lib/validation/submission'
import { geocodeAddress } from '@/lib/geocoding/client'
import { findSimilarListings } from '@/lib/duplicate-detection/similarity'
import { sql } from 'drizzle-orm'

export type SubmitState = {
  success?: boolean
  errors?: Record<string, string[]>
  message?: string
  duplicates?: Array<{ id: string; name: string; role: string; similarity: number }>
}

export async function submitListing(
  prevState: SubmitState,
  formData: FormData
): Promise<SubmitState> {
  // 1. Parse and validate form data with Zod
  const raw = {
    name: formData.get('name') as string,
    organization: formData.get('organization') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    role: formData.get('role') as string,
    specialties: formData.getAll('specialties') as string[],
    website: formData.get('website') as string,
    description: formData.get('description') as string,
    address: formData.get('address') as string,
  }

  const validated = submissionSchema.safeParse(raw)

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Please fix the errors below.',
    }
  }

  const { name, organization, email, phone, role, specialties, website, description, address } = validated.data

  try {
    // 2. Geocode address with Mapbox
    const geocodeResult = await geocodeAddress(address)

    if (!geocodeResult.success) {
      return {
        errors: { address: [geocodeResult.error] },
        message: 'Address validation failed.',
      }
    }

    const { coordinates, formattedAddress } = geocodeResult.data

    // 3. Check for potential duplicates
    const similarListings = await findSimilarListings({ name, threshold: 0.4 })

    // If high-confidence duplicate found (>70%), flag it but still save
    const highConfidenceDupe = similarListings.find(s => s.similarity > 0.7)

    // 4. Insert into submissions table
    // Use PostGIS ST_MakePoint for proper geometry insertion (text cannot be implicitly cast to geometry)
    await db.insert(submissions).values({
      name,
      organization: organization || null,
      email,
      phone: phone || null,
      role,
      specialties,
      website: website || null,
      description: description || null,
      address: formattedAddress,
      formattedAddress,
      location: sql`ST_SetSRID(ST_MakePoint(${coordinates.x}::double precision, ${coordinates.y}::double precision), 4326)`,
      status: 'pending',
      duplicateOf: highConfidenceDupe?.id ?? null,
      similarityScore: highConfidenceDupe ? String(highConfidenceDupe.similarity) : null,
    })

    // 5. Return success (with duplicate warning if applicable)
    if (similarListings.length > 0) {
      return {
        success: true,
        duplicates: similarListings,
        message: 'Submission received! Note: We found similar existing listings. An admin will review your submission.',
      }
    }

    return {
      success: true,
      message: 'Submission received! An admin will review your listing and you will be notified when it is approved.',
    }
  } catch (error) {
    console.error('Submission error:', error)
    return {
      message: 'An unexpected error occurred. Please try again.',
    }
  }
}
