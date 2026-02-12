import { db } from '@/lib/db'
import { listings } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ListingForm } from '@/components/admin/listing-form'
import { updateListing } from '../../actions'

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [listing] = await db
    .select()
    .from(listings)
    .where(eq(listings.id, id))
    .limit(1)

  if (!listing) {
    notFound()
  }

  // Create bound action with listing ID
  const boundUpdateListing = updateListing.bind(null, id)

  // Convert listing data to form-compatible defaultValues
  const defaultValues = {
    name: listing.name,
    description: listing.description || '',
    role: listing.role,
    specialties: listing.specialties || [],
    address: listing.address || '',
    phone: listing.phone || '',
    email: listing.email || '',
    website: listing.website || '',
    imageUrl: listing.imageUrl || '',
    status: listing.status,
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-50 font-heading mb-8">
        Edit Listing: {listing.name}
      </h1>
      <div className="max-w-2xl">
        <ListingForm
          action={boundUpdateListing}
          defaultValues={defaultValues}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  )
}
