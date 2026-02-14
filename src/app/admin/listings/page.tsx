import { db } from '@/lib/db'
import { listings } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'
import { ListingTable } from '@/components/admin/listing-table'
import Link from 'next/link'

export default async function ListingsPage() {
  const allListings = await db
    .select({
      id: listings.id,
      name: listings.name,
      role: listings.role,
      email: listings.email,
      status: listings.status,
      updatedAt: listings.updatedAt,
    })
    .from(listings)
    .orderBy(desc(listings.updatedAt))

  const serialized = allListings.map(l => ({
    ...l,
    email: l.email || '',
    updatedAt: l.updatedAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 font-heading">All Listings</h1>
          <p className="text-sm text-slate-400 mt-1">{allListings.length} total listings</p>
        </div>
        <Link
          href="/admin/listings/new"
          className="rounded-md bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200 transition-colors"
        >
          + New Listing
        </Link>
      </div>
      <ListingTable data={serialized} />
    </div>
  )
}
