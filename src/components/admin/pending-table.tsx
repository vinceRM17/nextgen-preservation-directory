'use client'

import { useState } from 'react'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from '@tanstack/react-table'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { approveSubmission, rejectSubmission } from '@/app/(admin)/pending/actions'
import type { PendingSubmission } from './columns-pending'

export function PendingTable({ data }: { data: PendingSubmission[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [rejectNotes, setRejectNotes] = useState('')

  async function handleApprove(id: string) {
    setActionLoading(id)
    try {
      const result = await approveSubmission(id)
      if (result.error) {
        alert(result.error)
      }
    } catch {
      alert('Failed to approve submission')
    }
    setActionLoading(null)
  }

  async function handleReject() {
    if (!rejectId) return
    setActionLoading(rejectId)
    try {
      const result = await rejectSubmission(rejectId, rejectNotes)
      if (result.error) {
        alert(result.error)
      }
    } catch {
      alert('Failed to reject submission')
    }
    setActionLoading(null)
    setRejectId(null)
    setRejectNotes('')
  }

  // Build columns with actions inline (need closure over handlers)
  const columnsWithActions: ColumnDef<PendingSubmission>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const hasDuplicate = row.original.duplicateOf
        return (
          <div>
            <span className="font-medium text-slate-50">{row.getValue('name') as string}</span>
            {hasDuplicate && (
              <span className="ml-2 inline-flex items-center rounded-full bg-yellow-900 px-2 py-0.5 text-xs font-semibold text-yellow-200">
                Possible Duplicate ({Math.round(parseFloat(row.original.similarityScore || '0') * 100)}%)
              </span>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'role',
      header: 'Category',
      cell: ({ row }) => (
        <span className="inline-flex items-center rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-semibold text-slate-200">
          {row.getValue('role') as string}
        </span>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => (
        <span className="max-w-[200px] truncate block text-slate-300">{row.getValue('address') as string}</span>
      ),
    },
    {
      accessorKey: 'submittedAt',
      header: 'Submitted',
      cell: ({ row }) => {
        const date = new Date(row.getValue('submittedAt') as string)
        return <span className="text-slate-400">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      },
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const id = row.original.id
        const loading = actionLoading === id
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(id)}
              disabled={loading}
              className="rounded-md bg-green-700 px-3 py-1.5 text-xs font-medium text-green-50 hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Processing...' : 'Approve'}
            </button>
            <button
              onClick={() => setRejectId(id)}
              disabled={loading}
              className="rounded-md bg-red-700 px-3 py-1.5 text-xs font-medium text-red-50 hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              Reject
            </button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  })

  return (
    <>
      <div className="rounded-md border border-slate-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columnsWithActions.length} className="h-24 text-center text-slate-400">
                  No pending submissions.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Reject confirmation dialog */}
      {rejectId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-2">Reject Submission</h3>
            <p className="text-sm text-slate-400 mb-4">
              Are you sure you want to reject this submission? You can add optional notes.
            </p>
            <textarea
              value={rejectNotes}
              onChange={(e) => setRejectNotes(e.target.value)}
              placeholder="Reason for rejection (optional)"
              className="w-full min-h-[80px] rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 mb-4"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => { setRejectId(null); setRejectNotes('') }}
                className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-50 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading === rejectId}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading === rejectId ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
