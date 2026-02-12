# Roadmap: NextGen Preservation Collab Directory

## Overview

Deliver a public, searchable directory connecting Louisville's historic preservation stakeholders through three focused phases: build the core browsable directory with map-based search, enable community submissions with admin moderation, then seed initial content and polish for launch.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Setup & Core Directory** - Foundation, database, browse, search, and map
- [ ] **Phase 2: Submissions & Admin** - Public submission form and moderation workflow
- [ ] **Phase 3: Content & Polish** - Initial listings, performance, and launch prep

## Phase Details

### Phase 1: Setup & Core Directory
**Goal**: Users can browse and search preservation stakeholders on an interactive map with professional, accessible design
**Depends on**: Nothing (first phase)
**Requirements**: DIR-01, DIR-02, DIR-03, DIR-04, SRCH-01, SRCH-02, SRCH-03, SRCH-04, UX-01, UX-02, UX-03, UX-04
**Success Criteria** (what must be TRUE):
  1. User can browse listing cards showing stakeholder name, role, specialties, and contact info
  2. User can view detailed profile pages with complete information and project portfolios
  3. User can search listings by name, specialty, or keyword with instant results
  4. User can filter listings by category (Builder, Craftsperson, Architect, etc.) and location
  5. User can view listings on an interactive map with clustered markers
  6. User can click map markers to view stakeholder details
  7. Directory works seamlessly on phone, tablet, and desktop
  8. Listing pages appear in Google search results with proper metadata
**Plans**: 7 plans in 4 waves

Plans:
- [ ] 01-01-PLAN.md — Foundation & data layer (Next.js 15, PostgreSQL, Drizzle ORM)
- [ ] 01-02-PLAN.md — Design system & layout (Tailwind, shadcn/ui, Header/Footer)
- [ ] 01-03-PLAN.md — Browse & display (Listing cards, grid, detail pages)
- [ ] 01-04-PLAN.md — Search & filter system (Full-text search, URL state)
- [ ] 01-05-PLAN.md — Interactive map (Leaflet, clustering, PostGIS queries)
- [ ] 01-06-PLAN.md — SEO & accessibility (Schema markup, WCAG compliance)
- [ ] 01-07-PLAN.md — Integration verification (Human UAT)

### Phase 2: Submissions & Admin
**Goal**: Collab staff can approve community-submitted listings through a secure moderation workflow
**Depends on**: Phase 1
**Requirements**: SUB-01, SUB-02, SUB-03, ADM-01, ADM-02, ADM-03
**Success Criteria** (what must be TRUE):
  1. Stakeholder can submit a new listing via public form with contact details, specialties, and location
  2. Submitted addresses are validated and displayed on map preview before submission
  3. System flags potential duplicate submissions for admin review
  4. Collab staff can log in to secure admin dashboard
  5. Admin can view pending submissions in moderation queue
  6. Admin can approve, reject, or edit submissions with changes immediately reflected
  7. Admin can create and edit listings directly without submission flow
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Content & Polish
**Goal**: Directory launches with 100+ verified listings and optimized performance
**Depends on**: Phase 2
**Requirements**: (Content seeding, performance optimization - supports all prior requirements)
**Success Criteria** (what must be TRUE):
  1. Directory contains 100+ verified preservation stakeholders across all categories
  2. Map renders smoothly with 100+ markers on mobile devices
  3. Search returns results in under 500ms for any query
  4. All pages pass WCAG 2.1 AA accessibility validation
  5. Directory passes Google Core Web Vitals on mobile and desktop
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Setup & Core Directory | 0/7 | Ready to execute | - |
| 2. Submissions & Admin | 0/TBD | Not started | - |
| 3. Content & Polish | 0/TBD | Not started | - |

---
*Last updated: 2026-02-12 after Phase 1 planning*
