---
phase: 02-submissions-admin
plan: 06
subsystem: admin
tags: [crud, tanstack-table, react-hook-form, zod, server-actions, drizzle]

# Dependency graph
requires:
  - phase: 02-02
    provides: "Admin layout with sidebar and Clerk auth"
  - phase: 02-05
    provides: "TanStack Table pattern and pending moderation queue"
  - phase: 02-01
    provides: "adminListingSchema, UI components, React Hook Form"
provides:
  - "Admin listings table at /admin/listings showing all listings with status badges"
  - "Create new listing form at /admin/listings/new"
  - "Edit existing listing form at /admin/listings/[id]/edit"
  - "Delete listing with confirmation dialog"
  - "Server Actions for listing CRUD (createListing, updateListing, deleteListing)"
  - "Reusable ListingForm component for create and edit modes"
affects: [02-07]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Bound server action with .bind(null, id) for passing entity ID"
    - "Reusable form component with defaultValues prop for create/edit dual use"
    - "ActionState type for server action form state (errors + message)"

key-files:
  created:
    - src/app/(admin)/listings/actions.ts
    - src/app/(admin)/listings/page.tsx
    - src/app/(admin)/listings/new/page.tsx
    - src/app/(admin)/listings/[id]/edit/page.tsx
    - src/components/admin/listing-form.tsx
    - src/components/admin/listing-table.tsx
  modified: []

key-decisions:
  - "Used ActionState type (errors + message) instead of any for server action prevState"
  - "Reusable ListingForm for both create and edit via defaultValues prop and shared action interface"
  - "Status badges with color-coded backgrounds matching 02-05 pattern (green/yellow/red/gray)"
  - "Next.js 15 async params pattern with Promise<{ id: string }>"
  - "Bound server action via .bind(null, id) for updateListing"

patterns-established:
  - "Bound server action pattern: action.bind(null, entityId) for passing IDs to form actions"
  - "Dual-mode form component: single form with optional defaultValues for create vs edit"
  - "ActionState type for typed server action state management"

# Metrics
duration: 3min
completed: 2026-02-12
---

# Phase 02 Plan 06: Admin Listing CRUD Summary

**Full admin CRUD for listings with TanStack Table, reusable form component, server actions, and status badge system**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-12T17:59:50Z
- **Completed:** 2026-02-12T18:02:35Z
- **Tasks:** 3
- **Files created:** 6

## Accomplishments
- Server Actions for create, update, and delete listings with Clerk auth guards and Zod validation
- Reusable ListingForm component supporting both create (empty) and edit (pre-populated) modes
- All-listings table with TanStack Table, color-coded status badges, and inline edit/delete actions
- New listing page and edit listing page with proper Next.js 15 async params pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Create listing CRUD Server Actions** - `7d2e853` (feat)
2. **Task 2: Create listing table page and reusable listing form** - `9eafd90` (feat)
3. **Task 3: Create new listing and edit listing pages** - `0809857` (feat)

## Files Created/Modified
- `src/app/(admin)/listings/actions.ts` - Server Actions: createListing, updateListing, deleteListing with auth + validation
- `src/app/(admin)/listings/page.tsx` - Server component fetching all listings, rendering ListingTable
- `src/app/(admin)/listings/new/page.tsx` - Empty form page using createListing action
- `src/app/(admin)/listings/[id]/edit/page.tsx` - Pre-populated form using bound updateListing action
- `src/components/admin/listing-form.tsx` - Reusable form with React Hook Form, Zod, specialties grid, status dropdown
- `src/components/admin/listing-table.tsx` - TanStack Table with status badges, edit links, delete confirmation modal

## Decisions Made
- Used ActionState type `{ errors?: Record<string, string[]>; message?: string }` instead of `any` for server action state -- proper typing per user note
- Reusable ListingForm accepts an `action` prop and optional `defaultValues` for dual create/edit use
- Status badge colors: approved=green-900, pending=yellow-900, rejected=red-900, draft=slate-700 -- matching 02-05 pattern
- Used `updateListing.bind(null, id)` pattern to pass listing ID to server action from client form
- Edit page uses Next.js 15 async params pattern: `params: Promise<{ id: string }>` with `await params`
- `eq` imported from `drizzle-orm` (not from schema) per user note

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Admin CRUD complete, ready for 02-07 integration verification
- All admin pages (dashboard, pending, listings) are functional
- Listing management bypasses submission flow for direct admin operations

---
*Phase: 02-submissions-admin*
*Completed: 2026-02-12*
