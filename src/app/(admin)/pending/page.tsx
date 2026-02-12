import { db } from '@/lib/db'
import { submissions } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { PendingTable } from '@/components/admin/pending-table'

export default async function PendingSubmissionsPage() {
  const pending = await db
    .select({
      id: submissions.id,
      name: submissions.name,
      email: submissions.email,
      role: submissions.role,
      address: submissions.formattedAddress,
      submittedAt: submissions.submittedAt,
      duplicateOf: submissions.duplicateOf,
      similarityScore: submissions.similarityScore,
    })
    .from(submissions)
    .where(eq(submissions.status, 'pending'))
    .orderBy(desc(submissions.submittedAt))

  // Convert dates to ISO strings for serialization to client component
  const serialized = pending.map(s => ({
    ...s,
    address: s.address || '',
    submittedAt: s.submittedAt.toISOString(),
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 font-heading">
            Pending Submissions
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {pending.length} submission{pending.length !== 1 ? 's' : ''} awaiting review
          </p>
        </div>
      </div>
      <PendingTable data={serialized} />
    </div>
  )
}
