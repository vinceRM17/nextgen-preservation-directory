---
phase: 01-setup-core-directory
plan: 03
subsystem: ui, data-layer
tags: [listings, components, server-components, next.js-15, drizzle-queries]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Database schema and Drizzle ORM setup"
  - phase: 01-02
    provides: "Design system and layout components"
provides:
  - Database query functions (getListings, getListing)
  - ListingCard component for displaying listing summaries
  - ListingGrid component with responsive grid layout
  - ListingDetail component for full listing profiles
  - Dynamic listing detail pages at /listings/[id]
  - Homepage with browsable listing grid
  - (public) route group with MainLayout integration
affects: [all-listing-pages, search-functionality, filtering-features]

# Tech tracking
tech-stack:
  added: [shadcn/ui Card component]
  patterns: [Server Component data fetching, dynamic routing with [id], generateMetadata for SEO]

key-files:
  created:
    - src/lib/queries/listings.ts
    - src/components/ui/card.tsx
    - src/components/listings/ListingCard.tsx
    - src/components/listings/ListingGrid.tsx
    - src/components/listings/ListingDetail.tsx
    - src/app/(public)/layout.tsx
    - src/app/(public)/page.tsx
    - src/app/(public)/listings/[id]/page.tsx
  modified: []

key-decisions:
  - "Manually created shadcn Card component instead of CLI installation due to npx permission constraints"
  - "Used Server Component data fetching pattern from research (Pattern 1) - fetch in Server Components, not API routes"
  - "Implemented (public) route group for MainLayout wrapper across homepage and listing pages"
  - "Applied sticky positioning to contact info sidebar for better UX on long profiles"

patterns-established:
  - "Query functions pattern: Export async functions from src/lib/queries/, handle errors gracefully, return typed data"
  - "Component structure: Card-based layouts with shadcn/ui primitives, responsive grid with Tailwind"
  - "Dynamic routing: Server Component with async params, generateMetadata for SEO, notFound() for 404s"
  - "Empty states: Helpful messaging when no data available"

# Metrics
duration: 4min
completed: 2026-02-12
---

# Phase 01 Plan 03: Core Browsing Experience Summary

**Working homepage with listing cards, responsive grid layout, and dynamic detail pages fetching real data from PostgreSQL using Server Components**

## Performance

- **Duration:** 4 minutes
- **Started:** 2026-02-12T16:52:18Z
- **Completed:** 2026-02-12T16:55:48Z
- **Tasks:** 3
- **Files created:** 8

## Accomplishments
- Database query functions with approved-only filtering and error handling
- Responsive listing card component with image, name, role, specialties, and contact
- Grid layout supporting 1-4 columns across mobile, tablet, and desktop
- Full listing detail pages with portfolio project display
- Dynamic routing with SEO-optimized metadata generation
- Homepage integrated with real database queries via Server Components

## Task Commits

Each task was committed atomically:

1. **Task 1: Create database query functions for listings** - `72b1e82` (feat)
2. **Task 2: Create ListingCard and ListingGrid components** - `41a4d07` (feat)
3. **Task 3: Create listing detail page with portfolio display** - `a6fa78b` (feat)

## Files Created/Modified

- `src/lib/queries/listings.ts` - Query functions for fetching listings from PostgreSQL with Drizzle ORM
- `src/components/ui/card.tsx` - shadcn/ui Card component primitives (manually created)
- `src/components/listings/ListingCard.tsx` - Listing summary card with image, contact info, and specialty truncation
- `src/components/listings/ListingGrid.tsx` - Responsive grid layout with empty state handling
- `src/components/listings/ListingDetail.tsx` - Full listing profile with portfolio, description, and contact sidebar
- `src/app/(public)/layout.tsx` - Route group layout wrapper using MainLayout from 01-02
- `src/app/(public)/page.tsx` - Homepage with Server Component data fetching and ListingGrid
- `src/app/(public)/listings/[id]/page.tsx` - Dynamic listing detail page with metadata generation and 404 handling

## Decisions Made

- **Manual Card component creation**: Created shadcn/ui Card component manually instead of using CLI installation (`npx shadcn add card`) due to npx permission constraints in execution environment. This maintains identical functionality and styling as CLI-installed version.
- **Server Component data fetching**: Implemented Pattern 1 from research - fetch data directly in Server Components rather than API routes. This provides faster page loads, eliminates API maintenance overhead, and enables full TypeScript type safety from database to UI.
- **(public) route group**: Created `src/app/(public)/` route group to apply MainLayout wrapper across homepage and listing pages while keeping layout isolated from potential future route groups (admin, auth, etc).
- **Sticky sidebar positioning**: Applied `sticky top-4` to contact info card on listing detail pages so contact information remains visible during scroll on desktop, improving conversion rates for contact actions.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking Issue] Missing shadcn Card component**
- **Found during:** Task 2 - Creating ListingCard component
- **Issue:** Plan specified using shadcn/ui Card component, but it wasn't installed. CLI installation command (`npx shadcn add card`) failed due to npx permission constraints in execution environment.
- **Fix:** Manually created `src/components/ui/card.tsx` with complete shadcn/ui Card implementation including Card, CardHeader, CardTitle, CardDescription, CardContent, and CardFooter primitives. Implementation matches shadcn default Card structure with proper TypeScript types, Tailwind styling, and dark theme support.
- **Files created:** `src/components/ui/card.tsx`
- **Commit:** 41a4d07 (Task 2)
- **Justification:** This was a blocking dependency preventing task completion. Manual creation maintains identical functionality and API surface as CLI installation, ensuring consistency with shadcn/ui patterns and future component additions.

## Issues Encountered

None - all tasks completed successfully. The Card component constraint was resolved automatically per deviation Rule 3.

## User Setup Required

None - no external service configuration required. All components fetch from PostgreSQL database configured in plan 01-01.

## Next Phase Readiness

Core browsing experience complete and ready for:
- Search and filtering functionality (plan 01-04 or later)
- Map view with geospatial queries (plan 01-05 or later)
- Admin submission workflow (future phase)
- Additional shadcn components can be manually added as needed following same pattern

No blockers for subsequent plans.

## Self-Check: PASSED

All claimed files exist:
- src/lib/queries/listings.ts ✓
- src/components/ui/card.tsx ✓
- src/components/listings/ListingCard.tsx ✓
- src/components/listings/ListingGrid.tsx ✓
- src/components/listings/ListingDetail.tsx ✓
- src/app/(public)/layout.tsx ✓
- src/app/(public)/page.tsx ✓
- src/app/(public)/listings/[id]/page.tsx ✓

All commits verified:
- 72b1e82 (Task 1) ✓
- 41a4d07 (Task 2) ✓
- a6fa78b (Task 3) ✓

---
*Phase: 01-setup-core-directory*
*Completed: 2026-02-12*
