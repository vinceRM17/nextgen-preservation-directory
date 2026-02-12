'use server'

import { db } from '@/lib/db'
import { listings } from '@/lib/db/schema'
import { adminListingSchema } from '@/lib/validation/submission'
import { eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type ActionState = {
  errors?: Record<string, string[]>
  message?: string
}

export async function createListing(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const raw = {
    name: formData.get('name'),
    description: formData.get('description'),
    role: formData.get('role'),
    specialties: formData.getAll('specialties'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    website: formData.get('website'),
    imageUrl: formData.get('imageUrl'),
    status: formData.get('status') || 'approved',
  }

  const validated = adminListingSchema.safeParse(raw)

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed.',
    }
  }

  const data = validated.data

  await db.insert(listings).values({
    name: data.name,
    description: data.description || null,
    role: data.role,
    specialties: data.specialties,
    address: data.address || null,
    phone: data.phone || null,
    email: data.email || null,
    website: data.website || null,
    imageUrl: data.imageUrl || null,
    status: data.status || 'approved',
  })

  revalidatePath('/admin/listings')
  revalidatePath('/')
  redirect('/admin/listings')
}

export async function updateListing(
  listingId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const raw = {
    name: formData.get('name'),
    description: formData.get('description'),
    role: formData.get('role'),
    specialties: formData.getAll('specialties'),
    address: formData.get('address'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    website: formData.get('website'),
    imageUrl: formData.get('imageUrl'),
    status: formData.get('status') || 'approved',
  }

  const validated = adminListingSchema.safeParse(raw)

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Validation failed.',
    }
  }

  const data = validated.data

  await db
    .update(listings)
    .set({
      name: data.name,
      description: data.description || null,
      role: data.role,
      specialties: data.specialties,
      address: data.address || null,
      phone: data.phone || null,
      email: data.email || null,
      website: data.website || null,
      imageUrl: data.imageUrl || null,
      status: data.status || 'approved',
      updatedAt: new Date(),
    })
    .where(eq(listings.id, listingId))

  revalidatePath('/admin/listings')
  revalidatePath('/')
  redirect('/admin/listings')
}

export async function deleteListing(listingId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  await db.delete(listings).where(eq(listings.id, listingId))

  revalidatePath('/admin/listings')
  revalidatePath('/')

  return { success: true }
}
