'use server'

import { db } from '@/lib/db'
import { submissions, listings } from '@/lib/db/schema'
import { eq, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

export async function approveSubmission(submissionId: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  // 1. Fetch the submission
  const [submission] = await db
    .select()
    .from(submissions)
    .where(eq(submissions.id, submissionId))
    .limit(1)

  if (!submission) {
    return { error: 'Submission not found' }
  }

  if (submission.status !== 'pending') {
    return { error: 'Submission has already been reviewed' }
  }

  // 2. Create a new listing from submission data
  // Use sql template for location to ensure PostGIS geometry passes through correctly
  await db.insert(listings).values({
    name: submission.name,
    description: submission.description,
    role: submission.role,
    specialties: submission.specialties,
    address: submission.formattedAddress || submission.address,
    phone: submission.phone,
    email: submission.email,
    website: submission.website,
    location: submission.location,
    status: 'approved',
  })

  // 3. Update submission status to approved
  await db
    .update(submissions)
    .set({
      status: 'approved',
      reviewedAt: new Date(),
      reviewedBy: userId,
      updatedAt: new Date(),
    })
    .where(eq(submissions.id, submissionId))

  revalidatePath('/admin/pending')
  revalidatePath('/admin')
  revalidatePath('/')

  return { success: true }
}

export async function rejectSubmission(submissionId: string, notes?: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const [submission] = await db
    .select()
    .from(submissions)
    .where(eq(submissions.id, submissionId))
    .limit(1)

  if (!submission) {
    return { error: 'Submission not found' }
  }

  if (submission.status !== 'pending') {
    return { error: 'Submission has already been reviewed' }
  }

  await db
    .update(submissions)
    .set({
      status: 'rejected',
      adminNotes: notes || null,
      reviewedAt: new Date(),
      reviewedBy: userId,
      updatedAt: new Date(),
    })
    .where(eq(submissions.id, submissionId))

  revalidatePath('/admin/pending')
  revalidatePath('/admin')

  return { success: true }
}
