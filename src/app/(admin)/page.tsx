import { db } from '@/lib/db'
import { listings, submissions } from '@/lib/db/schema'
import { eq, count } from 'drizzle-orm'

export default async function AdminDashboard() {
  // Fetch summary counts with error handling
  let pendingCount = 0
  let approvedCount = 0
  let totalListings = 0

  try {
    const [pendingResult] = await db
      .select({ count: count() })
      .from(submissions)
      .where(eq(submissions.status, 'pending'))
    pendingCount = pendingResult?.count ?? 0
  } catch (error) {
    console.error('Error fetching pending submissions count:', error)
  }

  try {
    const [approvedResult] = await db
      .select({ count: count() })
      .from(listings)
      .where(eq(listings.status, 'approved'))
    approvedCount = approvedResult?.count ?? 0
  } catch (error) {
    console.error('Error fetching approved listings count:', error)
  }

  try {
    const [totalResult] = await db
      .select({ count: count() })
      .from(listings)
    totalListings = totalResult?.count ?? 0
  } catch (error) {
    console.error('Error fetching total listings count:', error)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-50 font-heading mb-8">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending submissions card */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Pending Submissions</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {pendingCount}
          </p>
        </div>
        {/* Approved listings card */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Approved Listings</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {approvedCount}
          </p>
        </div>
        {/* Total listings card */}
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">Total Listings</p>
          <p className="text-3xl font-bold text-slate-50 mt-2">
            {totalListings}
          </p>
        </div>
      </div>
    </div>
  )
}
