# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-12)

**Core value:** People working in Louisville's historic preservation ecosystem can find and connect with each other — because right now, they can't.
**Current focus:** Phase 02 - Submissions & Admin

## Current Position

Phase: 02 of 3 (Submissions & Admin)
Plan: 6 of 7 complete
Status: Executing Phase 02 plans
Last activity: 2026-02-12 — Completed plan 02-06 (Admin Listing CRUD)

Progress: [████████░░] 86% (6/7 plans)

## Performance Metrics

**Velocity:**
- Total plans completed: 12
- Average duration: 3.4 min
- Total execution time: 0.68 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-setup-core-directory | 6 | 26 min | 4.3 min |
| 02-submissions-admin | 6 | 15 min | 2.5 min |

**Recent Executions:**
| Plan | Duration | Tasks | Files |
|------|----------|-------|-------|
| 01-04 | 5 min | 3 | 9 |
| 01-05 | 3 min | 3 | 4 |
| 01-06 | 5 min | 3 | 10 |
| 02-01 | 4 min | 3 | 14 |
| 02-02 | 2 min | 3 | 7 |
| 02-03 | 2 min | 2 | 4 |
| 02-04 | 3 min | 2 | 4 |
| 02-05 | 2 min | 2 | 5 |
| 02-06 | 3 min | 3 | 6 |

**Recent Trend:**
- Last 6 plans: 02-02 (2min), 02-03 (2min), 02-04 (3min), 02-05 (2min), 02-06 (3min)
- Trend: Consistent execution, Phase 02 averaging 2.5min vs Phase 01's 4.3min

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

**Plan 01-01 (Foundation & Database):**
- Used Drizzle ORM over Prisma for edge-ready footprint
- Implemented PostGIS geometry(Point, 4326) for geospatial coordinates
- Enforced DIR-03 category taxonomy at database level with enum constraint
- Used PostgreSQL native full-text search with tsvector instead of external service
- Created custom Drizzle types for PostGIS geometry and tsvector columns

**Plan 01-02 (Design System):**
- Used shadcn/ui manual configuration instead of CLI init
- Chose dark slate-900 background for professional directory aesthetic
- Implemented simple mobile menu instead of Sheet component for MVP
- Used HSL color variables for future theming flexibility

**Plan 01-03 (Core Browsing Experience):**
- Manually created shadcn Card component instead of CLI installation due to npx constraints
- Used Server Component data fetching pattern (fetch in Server Components, not API routes)
- Implemented (public) route group for MainLayout wrapper across homepage and listing pages
- Applied sticky positioning to contact info sidebar for better UX on long profiles

**Plan 01-04 (Search & Filtering Implementation):**
- Implemented custom useDebounce hook instead of installing use-debounce library
- Created minimal UI components (Input, Select) for MVP instead of full shadcn/ui setup
- Used inline SVG icons to avoid external icon library dependency
- Added pg_trgm extension for typo tolerance via trigram similarity
- Established URL-based state management pattern for all filter state (shareable search results)

**Plan 01-05 (Interactive Map):**
- Combined all 3 tasks in single commit — tightly coupled map components, queries, and page
- Used dynamic imports for all Leaflet components to prevent SSR errors
- Included isMounted check with loading state to prevent hydration mismatch

**Plan 01-06 (SEO & Accessibility):**
- Used Next.js Metadata API for sitemap/robots (type-safe, auto-generates)
- Dynamic sitemap queries approved listings only
- Centralized ARIA labels in config file for consistency
- Skip-to-content link with sr-only + focus:not-sr-only pattern

**Plan 02-01 (Database Schema & UI Foundation):**
- Reused statusEnum and categoryEnum from listings table for submissions table consistency
- Created separate trigram indexes migration (0003) for duplicate detection
- Installed react-hook-form early (deviation Rule 3) to resolve TypeScript compilation blocking issue
- Used native HTML dialog approach instead of Radix UI for lighter footprint
- Form components use React Hook Form's Controller pattern with context for field state sharing

**Plan 02-02 (Admin Auth & Layout):**
- Used Clerk for admin authentication (edge-compatible, production-ready)
- Middleware-based route protection (centralized, automatic redirects)
- Call auth() once in layout instead of per-page (Clerk best practice)
- Added error handling for database queries to handle missing/empty tables during development

**Plan 02-03 (Geocoding & Duplicate Detection):**
- Used Mapbox v6 geocoding API with proximity bias toward Louisville center
- Discriminated union return type (success: true/false) for geocoding results
- Coordinates as {x: lon, y: lat} matching PostGIS POINT(lon lat) convention
- Default similarity threshold 0.4 (broad for admin review), strict 0.7 (auto-flag)
- Graceful error handling: duplicate detection returns empty array on failure, never blocks submissions
- Fixed result.rows.map() to result.map() for drizzle-orm/postgres-js driver compatibility

**Plan 02-04 (Public Submission Form):**
- Used PostGIS ST_MakePoint via drizzle-orm sql template tag for geometry insertion (text cannot be implicitly cast to geometry)
- useActionState imported from react (React 19) not react-dom for server action integration
- Dual validation: React Hook Form + Zod for instant client feedback, Zod in server action as source of truth
- Duplicates flagged but submission still saved (admin makes final call)
- Native checkbox grid for specialties instead of Form component wrapper for simplicity
- Sonner toast notifications with dark slate theme styling

**Plan 02-05 (Admin Moderation Queue):**
- Used TanStack Table v8 with inline column definitions for action handler closures
- Server Actions for approve/reject instead of API routes (defense in depth with auth check)
- Inline Tailwind styles in column cells to avoid component-passing complexity through TanStack Table
- Simple modal overlay for reject dialog instead of Dialog component
- ISO string date serialization for server-to-client data passing

**Plan 02-06 (Admin Listing CRUD):**
- Used ActionState type (errors + message) instead of any for server action prevState
- Reusable ListingForm for both create and edit via defaultValues prop and shared action interface
- Status badges with color-coded backgrounds matching 02-05 pattern (green/yellow/red/gray)
- Bound server action via .bind(null, id) for updateListing
- Next.js 15 async params pattern with Promise<{ id: string }>

### Pending Todos

None yet.

### Blockers/Concerns

None yet.

## Session Continuity

Last session: 2026-02-12
Stopped at: Completed 02-06-PLAN.md (Admin Listing CRUD)
Resume file: None

Next step: Execute plan 02-07 (Integration Verification)

---
*Last updated: 2026-02-12 after completing plan 02-06*
