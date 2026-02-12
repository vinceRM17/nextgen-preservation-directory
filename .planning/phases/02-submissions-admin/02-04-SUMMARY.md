---
phase: 02-submissions-admin
plan: 04
subsystem: ui, api
tags: [react-hook-form, zod, server-actions, geocoding, postgis, sonner, duplicate-detection]

# Dependency graph
requires:
  - phase: 02-01
    provides: submissions table schema, submissionSchema validation, categoryValues, UI components (Input, Select, Textarea, Button, Label, Checkbox, Form)
  - phase: 02-03
    provides: geocodeAddress() for Mapbox geocoding, findSimilarListings() for pg_trgm duplicate detection
provides:
  - Public submission form at /submit with client-side and server-side validation
  - Server action submitListing() for processing submissions with geocoding and duplicate detection
  - Success confirmation page at /submit/success
  - SubmitState type for structured form action responses
affects: [02-05, 02-06, 02-07]

# Tech tracking
tech-stack:
  added: [@hookform/resolvers, sonner]
  patterns: [useActionState from React 19 for server action state, dual validation (client + server), PostGIS ST_MakePoint for geometry insertion]

key-files:
  created:
    - src/app/submit/actions.ts
    - src/app/submit/form.tsx
    - src/app/submit/page.tsx
    - src/app/submit/success/page.tsx
  modified: []

key-decisions:
  - "Used PostGIS ST_MakePoint with sql template tag instead of WKT text string for geometry insertion (text cannot be implicitly cast to geometry)"
  - "useActionState imported from react (React 19) not react-dom for server action integration"
  - "Dual validation: React Hook Form + Zod for instant client feedback, Zod in server action as source of truth"
  - "Duplicates flagged but submission still saves (admin makes final call on duplicates)"
  - "Specialties rendered as native checkbox grid instead of Form component wrapper for simplicity"
  - "Sonner toast notifications with dark slate theme styling for consistent UX"

patterns-established:
  - "Server Action pattern: useActionState + FormData + Zod safeParse with structured SubmitState return type"
  - "PostGIS insertion: sql`ST_SetSRID(ST_MakePoint(lon, lat), 4326)` via drizzle-orm sql template tag"
  - "Form section pattern: bg-slate-900 cards with border-b section headers and required field asterisks"

# Metrics
duration: 3min
completed: 2026-02-12
---

# Plan 02-04: Public Submission Form Summary

**Public listing submission form with React Hook Form + Zod dual validation, Mapbox geocoding, pg_trgm duplicate detection, and PostGIS geometry insertion via server action**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-12T17:53:54Z
- **Completed:** 2026-02-12T17:56:47Z
- **Tasks:** 2
- **Files created:** 4

## Accomplishments
- Server action validates with Zod, geocodes via Mapbox, detects duplicates with pg_trgm, and inserts into submissions table with PostGIS geometry
- Client form with React Hook Form provides instant field-level validation before server submission
- Three-section form layout (Contact, Professional Details, Location) with dark slate design system
- Success confirmation page with directory browsing and re-submission links

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, create Server Action** - `9b59957` (feat)
2. **Task 2: Create submission form page with client-side validation** - `1ecde7f` (feat)

## Files Created/Modified
- `src/app/submit/actions.ts` - Server action: Zod validation, Mapbox geocoding, duplicate detection, PostGIS insert
- `src/app/submit/form.tsx` - Client component: React Hook Form with zodResolver, useActionState, specialties checkboxes, toast notifications
- `src/app/submit/page.tsx` - Server component wrapper with SEO metadata
- `src/app/submit/success/page.tsx` - Success confirmation page with checkmark and navigation links

## Decisions Made
- **PostGIS geometry insertion:** Used `sql\`ST_SetSRID(ST_MakePoint(...))\`` via drizzle-orm sql template tag instead of WKT text string (PostgreSQL cannot implicitly cast text to geometry type)
- **useActionState from React 19:** Imported from `react` not `react-dom` (Next.js 15 / React 19 convention)
- **Skipped react-hook-form install:** Already installed in plan 02-01 (deviation from that plan). Only installed @hookform/resolvers and sonner.
- **Dual validation strategy:** Client-side via React Hook Form + zodResolver for instant UX feedback; server-side via Zod safeParse as the source of truth that can't be bypassed
- **Duplicate handling:** Submissions with high-similarity matches are still saved (status: pending) with duplicateOf and similarityScore fields populated. Admin makes final determination.
- **Native checkboxes for specialties:** Used checkbox grid with manual state management instead of Form component wrapper, reducing complexity

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed PostGIS geometry insertion**
- **Found during:** Task 1 (Server Action creation)
- **Issue:** Plan used `POINT(lon lat)` WKT string for location field, but PostgreSQL cannot implicitly cast text to geometry type
- **Fix:** Used drizzle-orm sql template tag with ST_SetSRID(ST_MakePoint()) for proper PostGIS geometry insertion
- **Files modified:** src/app/submit/actions.ts
- **Verification:** npx tsc --noEmit passes
- **Committed in:** 9b59957

**2. [Rule 1 - Bug] Fixed useActionState import source**
- **Found during:** Task 2 (Client form creation)
- **Issue:** Plan referenced useActionState from react-dom, but in React 19 / Next.js 15 it's exported from react
- **Fix:** Imported useActionState from 'react' instead of 'react-dom'
- **Files modified:** src/app/submit/form.tsx
- **Verification:** npx tsc --noEmit passes
- **Committed in:** 1ecde7f

**3. [Rule 3 - Blocking] Skipped redundant react-hook-form install**
- **Found during:** Task 1 (Dependency installation)
- **Issue:** Plan said to install react-hook-form, but it was already installed in plan 02-01
- **Fix:** Only installed @hookform/resolvers and sonner
- **Files modified:** package.json
- **Verification:** All three packages confirmed in package.json dependencies
- **Committed in:** 9b59957

---

**Total deviations:** 3 auto-fixed (2 bug fixes, 1 blocking)
**Impact on plan:** All fixes necessary for correctness. PostGIS fix prevents runtime database errors. useActionState fix prevents TypeScript compilation errors. No scope creep.

## Issues Encountered
None - execution was straightforward after applying the documented bug fixes.

## User Setup Required
None - no additional external service configuration required. Mapbox token was configured in plan 02-03.

## Next Plan Readiness
- Public submission form complete and functional at /submit
- Ready for plan 02-05 (Admin Submission Review Dashboard) which will display and manage submitted listings
- Server action creates submissions with status='pending' for admin review queue

## Self-Check: PASSED

- All 4 created files verified on disk
- Commit 9b59957 (Task 1) verified in git log
- Commit 1ecde7f (Task 2) verified in git log
- TypeScript compilation passes (npx tsc --noEmit)

---
*Phase: 02-submissions-admin*
*Completed: 2026-02-12*
