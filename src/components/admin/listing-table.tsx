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
import Link from 'next/link'
import { deleteListing } from '@/app/(admin)/listings/actions'

export type ListingRow = {
  id: string
  name: string
  role: string
  email: string
  status: string
  updatedAt: string
}

const statusColors: Record<string, string> = {
  approved: 'bg-green-900 text-green-200',
  pending: 'bg-yellow-900 text-yellow-200',
  rejected: 'bg-red-900 text-red-200',
  draft: 'bg-slate-700 text-slate-300',
}

export function ListingTable({ data }: { data: ListingRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  async function handleDelete() {
    if (!deleteId) return
    setActionLoading(deleteId)
    try {
      const result = await deleteListing(deleteId)
      if (!result.success) {
        alert('Failed to delete listing')
      }
    } catch {
      alert('Failed to delete listing')
    }
    setActionLoading(null)
    setDeleteId(null)
  }

  const columns: ColumnDef<ListingRow>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <span className="font-medium text-slate-50">{row.getValue('name') as string}</span>
      ),
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const colorClass = statusColors[status] || 'bg-slate-700 text-slate-300'
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colorClass}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <span className="text-slate-300">{row.getValue('email') as string || '-'}</span>
      ),
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated',
      cell: ({ row }) => {
        const date = new Date(row.getValue('updatedAt') as string)
        return (
          <span className="text-slate-400">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )
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
            <Link
              href={`/admin/listings/${id}/edit`}
              className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-50 hover:bg-slate-600 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => setDeleteId(id)}
              disabled={loading}
              className="rounded-md bg-red-700 px-3 py-1.5 text-xs font-medium text-red-50 hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              Delete
            </button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
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
                <TableCell colSpan={columns.length} className="h-24 text-center text-slate-400">
                  No listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-slate-50 mb-2">Delete Listing</h3>
            <p className="text-sm text-slate-400 mb-4">
              Are you sure you want to delete this listing? This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-50 hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={actionLoading === deleteId}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading === deleteId ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
