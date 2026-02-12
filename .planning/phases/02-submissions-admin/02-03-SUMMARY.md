---
phase: 02-submissions-admin
plan: 03
subsystem: api
tags: [mapbox, geocoding, pg_trgm, duplicate-detection, postgres, drizzle]

# Dependency graph
requires:
  - phase: 02-01
    provides: "Submissions table schema with location geometry column and trigram GIN indexes"
provides:
  - "geocodeAddress() function wrapping Mapbox v6 API with Louisville bounds validation"
  - "isWithinLouisville() bounds check for coordinate validation"
  - "findSimilarListings() pg_trgm similarity search for admin duplicate review"
  - "checkForDuplicate() strict similarity check for auto-flagging"
affects: [02-04, 02-05, 02-06]

# Tech tracking
tech-stack:
  added: [mapbox-geocoding-v6]
  patterns: [discriminated-union-results, graceful-error-fallback, pg_trgm-similarity-queries]

key-files:
  created:
    - src/lib/geocoding/client.ts
    - src/lib/geocoding/validation.ts
    - src/lib/duplicate-detection/similarity.ts
  modified:
    - .env.example

key-decisions:
  - "Used Mapbox v6 geocoding API with proximity bias toward Louisville center"
  - "Discriminated union return type (success: true/false) for geocoding results"
  - "Coordinates as {x: lon, y: lat} matching PostGIS POINT(lon lat) convention"
  - "Default similarity threshold 0.4 (broad for admin review), strict 0.7 (auto-flag)"
  - "Graceful error handling: duplicate detection returns empty array on failure, never blocks submissions"
  - "Fixed result.rows.map() to result.map() for drizzle-orm/postgres-js driver compatibility"

patterns-established:
  - "Discriminated union result pattern: { success: true, data } | { success: false, error }"
  - "Graceful degradation: utility functions never throw, return safe defaults on error"
  - "Raw SQL via Drizzle sql`` template tag for PostgreSQL extension functions (pg_trgm)"

# Metrics
duration: 2min
completed: 2026-02-12
---

# Phase 02 Plan 03: Geocoding & Duplicate Detection Summary

**Mapbox v6 geocoding client with Louisville Metro bounds validation and pg_trgm duplicate detection returning similarity-scored results for admin review**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-12T14:28:17Z
- **Completed:** 2026-02-12T14:30:00Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Mapbox geocoding client with Louisville Metro bounding box validation and proximity bias
- pg_trgm-based duplicate detection with two thresholds: broad (0.4) for admin review and strict (0.7) for auto-flagging
- Discriminated union result types for clean consumer-side error handling
- All functions handle errors gracefully without throwing or blocking submissions

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Mapbox geocoding client with Louisville bounds validation** - `3b1b25f` (feat)
2. **Task 2: Create pg_trgm duplicate detection utility** - `d4dc09f` (feat)

**Plan metadata:** (pending) (docs: complete plan)

## Files Created/Modified
- `src/lib/geocoding/validation.ts` - Louisville Metro bounding box constants and isWithinLouisville() check
- `src/lib/geocoding/client.ts` - Mapbox v6 geocoding API wrapper with Louisville bounds validation
- `src/lib/duplicate-detection/similarity.ts` - pg_trgm similarity queries: findSimilarListings() and checkForDuplicate()
- `.env.example` - Added MAPBOX_ACCESS_TOKEN entry

## Decisions Made
- Used Mapbox v6 geocoding API (latest) with proximity bias toward Louisville center for better local results
- Country filter to US only to reduce false positives
- Cache geocoding results for 1 hour using Next.js fetch cache
- Return coordinates as {x: lon, y: lat} matching PostGIS POINT(lon lat) convention
- Default similarity threshold 0.4 catches more potential duplicates for admin review; strict 0.7 for auto-flagging
- Only search approved listings (not pending/rejected) for duplicate detection
- Limit duplicate results to 5 for fast response times
- Parse similarity score from string to number (PostgreSQL returns numeric as string via postgres driver)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed result.rows.map() to result.map() for postgres-js driver**
- **Found during:** Task 2 (duplicate detection utility)
- **Issue:** Plan specified `result.rows.map(...)` but drizzle-orm/postgres-js driver returns results directly as an array, not with a `.rows` property
- **Fix:** Changed to `result.map(...)` which is the correct pattern for this driver
- **Files modified:** src/lib/duplicate-detection/similarity.ts
- **Verification:** TypeScript compilation passes, pattern matches drizzle-orm/postgres-js documentation
- **Committed in:** d4dc09f (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug fix)
**Impact on plan:** Essential bug fix for runtime correctness. No scope creep.

## Issues Encountered
None

## User Setup Required

**External services require manual configuration:**
- **MAPBOX_ACCESS_TOKEN** - Get from mapbox.com -> Tokens page -> Default public token or create new
- Free tier: 100K geocoding requests/month (sufficient for MVP)

## Next Phase Readiness
- Geocoding client ready for integration into public submission form (02-04)
- Duplicate detection ready for admin review panel integration (02-05, 02-06)
- Both utilities return clean types for downstream consumers

## Self-Check: PASSED

All files verified present, all commits verified in git log.

---
*Phase: 02-submissions-admin*
*Completed: 2026-02-12*
