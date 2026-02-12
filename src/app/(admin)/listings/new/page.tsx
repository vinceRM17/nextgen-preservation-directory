import { ListingForm } from '@/components/admin/listing-form'
import { createListing } from '../actions'

export default function NewListingPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-50 font-heading mb-8">
        Create New Listing
      </h1>
      <div className="max-w-2xl">
        <ListingForm action={createListing} submitLabel="Create Listing" />
      </div>
    </div>
  )
}
