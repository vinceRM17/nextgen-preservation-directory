# Project Research Summary

**Project:** NextGen Preservation Collab Directory
**Domain:** Professional/Community Directory with Geospatial Features
**Researched:** 2026-02-12
**Confidence:** HIGH

## Executive Summary

The NextGen Preservation Collab Directory is a specialized professional directory connecting historic preservation stakeholders (builders, craftspeople, architects, developers, advocates) with projects in Louisville, KY. Based on research, this should be built as a modern Next.js 15+ application with PostgreSQL/PostGIS for geospatial capabilities, using Leaflet for interactive mapping. The recommended architecture follows a server-first pattern with React Server Components, making this well-suited for a public-facing directory with SEO requirements and mobile-first design.

The most successful approach treats this as a curated content platform rather than an open submission board. Expert directories in this space emphasize quality over quantity through admin-moderated workflows, verified listings, and rich profile content (project portfolios, specialties, location-based search). The recommended stack (Next.js, PostgreSQL with PostGIS, Leaflet with OpenStreetMap, Tailwind with shadcn/ui) represents the 2026 standard for directory applications - battle-tested, cost-effective, and scalable enough for a regional directory.

Critical risks center on data quality and user experience: the "empty directory death spiral" (launching with insufficient content), map performance collapse at scale (>100 listings without clustering), duplicate listing pollution, and geocoding accuracy failures. These pitfalls are well-documented and preventable with proper implementation patterns from day one. The research suggests a phased approach starting with content seeding before public launch, followed by core browse/search functionality, then advanced features like self-service editing and automated workflows.

## Key Findings

### Recommended Stack

**Framework and Runtime:** Next.js 15+ with React 19 and TypeScript 5 provides the foundation - this is the industry standard for directory applications in 2026, offering server-first architecture ideal for SEO-dependent public directories. Node.js 20.x LTS provides the runtime.

**Core technologies:**
- **Next.js 15+ (App Router):** Server Components enable fast initial loads, built-in API routes simplify backend, file-based routing reduces complexity, image optimization built-in
- **PostgreSQL 15/16 + PostGIS 3.x:** Relational structure perfect for structured stakeholder data, PostGIS essential for geospatial queries (radius search, bounding box filtering), ACID compliance for admin workflows
- **Drizzle ORM:** Code-first TypeScript ORM with zero runtime overhead, SQL-like queries, edge-ready (better than Prisma for serverless)
- **Leaflet 1.9 + React Leaflet 4:** Open-source mapping (no API costs), 42KB gzipped, mobile-friendly, extensive plugin ecosystem
- **Tailwind CSS 4 + shadcn/ui:** Utility-first styling (2026 standard), copy-paste component library (full code ownership), WCAG-compliant Radix UI primitives
- **React Hook Form 7 + Zod 4:** Performant form state management, TypeScript-first runtime validation, essential for user submissions
- **Clerk:** Modern auth for admin-only access, MFA/OAuth/RBAC included, free tier handles admin use case, seamless App Router integration

**Deployment:** Vercel (Next.js creators, zero-config) with Neon or Supabase for managed PostgreSQL (free tier suitable, PostGIS support). All recommended services fit within free/community tiers for a Louisville-focused directory.

**Version compatibility verified:** Next.js 15 works with React 18/19, shadcn/ui updated for Tailwind 4, Drizzle supports PostgreSQL 12+, Clerk fully supports App Router.

### Expected Features

**Must have (table stakes):**
- **Basic Listing Information:** Name, contact, category/role, location, website, specialties - NAP consistency critical for SEO
- **Search & Filter:** Multi-criteria filtering (category, specialty, location), URL-based state for bookmarkability
- **Interactive Map View:** Geolocation pins with clustering, click for details, mobile touch-friendly
- **Mobile Responsive Design:** 70%+ traffic is mobile in 2026, must pass Core Web Vitals
- **Contact/Inquiry Forms:** Email forms with spam protection
- **Admin Approval Workflow:** Submission form → admin review → approve/reject moderation queue
- **Accessibility (WCAG 2.1 AA):** 4.5:1 contrast, keyboard navigation, alt text - legal requirement by April 2026
- **SEO Basics:** Clean URLs, meta descriptions, LocalBusiness schema markup

**Should have (competitive differentiators):**
- **Project Portfolio Showcase:** Photo galleries, before/after images, project descriptions - visual proof of work essential for historic preservation
- **Verified Listings:** Admin verification badge, trust signal that AI systems recognize
- **Specialties/Skills Taxonomy:** Granular skill tags ("slate roofing," "Victorian millwork"), multi-select filtering
- **Neighborhood/Project Map:** Filter by "has worked in [neighborhood]," proximity search
- **Claim & Manage Listing:** Stakeholders can claim/update own listings (pending approval), reduces admin burden
- **Rich Structured Data:** Comprehensive schema markup for voice search and AI answer engines

**Defer to v2+:**
- **AI-Powered Stakeholder Matching:** "Find best fit for my project" wizard - requires quality data foundation first
- **Multi-Criteria Advanced Search:** Saved searches, complex filter combinations - add when basic search proves insufficient
- **Export/Share Features:** Print-friendly views, PDF generation - low user demand until directory is established
- **User Reviews/Ratings:** ANTI-FEATURE - opens liability, moderation burden, gaming risk, conflicts in tight-knit community. Focus on verified portfolios instead.

**Key dependency insight:** Map view requires PostGIS setup first. Project portfolios enhance map experience. Claim-listing feature requires verification workflow. AI matching requires taxonomy + portfolios + structured data.

### Architecture Approach

**Server-first, component-driven architecture:** Next.js App Router with React Server Components for data fetching, client components only for interactive elements (map, filters, forms). No API routes for internal data - Server Components query database directly. This reduces HTTP overhead and keeps secrets server-side.

**Major components:**
1. **Public Browse Layer** - Listing grid/detail pages with server-side filtering, URL-based state management, streaming data with Next.js caching
2. **Interactive Map Component** - React-Leaflet client component with PostGIS-powered geospatial queries, marker clustering from day one, viewport-based loading
3. **Search/Filter System** - Multi-criteria server-side filtering using PostgreSQL full-text search, URL params via nuqs for shareable state
4. **Admin Dashboard** - Protected route group with approval workflow (pending → approved → published), moderation queue, editing tools
5. **Submission Pipeline** - Public submission form → Zod validation → submissions table → admin review → listings table (separate tables, not single status field)
6. **Data Access Layer** - Drizzle ORM with typed queries in lib/queries/, PostGIS functions for geospatial operations

**Architectural patterns:**
- **URL-based state for filters:** Search params store filter state (bookmarkable, shareable, SEO-friendly)
- **PostGIS for geospatial queries:** ST_DWithin for radius search, GiST spatial indexes, 300+ geospatial functions
- **Pending → Approved → Published workflow:** Separate submissions/listings tables, transaction-based approval, audit trail
- **Route groups for layouts:** (public) vs (admin) groups enable different layouts without URL prefixes
- **Middleware for route protection:** Single source of truth for admin auth checks

**Project structure:** App Router with route groups (public)/(admin), lib/ for queries/validation/auth, components/ organized by feature (listings/, map/, search/), drizzle/ for database schema and migrations.

### Critical Pitfalls

Research identified 12 major pitfalls, top 5 by impact:

1. **Map Performance Collapse at Scale:** Rendering 100+ markers individually freezes map, especially on mobile. **Prevention:** Implement marker clustering from day one (@googlemaps/markerclusterer or Supercluster), load only markers in viewport bounds, test with 500+ markers during development. This must be built correctly in Phase 1, not retrofitted later.

2. **The Empty Directory Death Spiral:** Launching with zero/few listings kills adoption - users leave, professionals won't submit to empty directory, classic cold start problem. **Prevention:** Seed 100+ verified listings BEFORE public launch. Work with Historic Preservation Collab to identify key professionals, import from existing resources, offer founding member benefits. Phase 0.5 content seeding is non-negotiable.

3. **Duplicate Listing Nightmare:** Multiple listings for same business ("Historic Masonry LLC", "Historic Masonry") pollute database, confuse users, split SEO authority. **Prevention:** Implement fuzzy name matching during submission (Levenshtein distance), normalize addresses via geocoding API, show "Similar listings exist" with claim option, build admin merge tool in Phase 1.

4. **Geocoding Validation Blindness:** User-entered addresses geocode to wrong locations (Louisville, CO instead of KY), typos pass validation, markers appear in wrong states. **Prevention:** Use Google Address Validation API (not just Geocoding API), constrain geographic bounds to Louisville metro, require confidence score, show map preview during submission, allow manual pin placement.

5. **Moderation Workflow Chaos:** No clear approval process leads to spam approved, legitimate entries rejected, backlog grows unmanageable. **Prevention:** Define explicit review criteria checklist (photo quality, address validation, spam detection), implement workflow states (pending → under review → approved), build admin filters, send status emails, set 48-hour review SLA.

**Additional high-risk pitfalls:** Stale listing decay (need annual re-verification), search that doesn't search (requires full-text indexing + fuzzy matching), filter overload paralysis (progressive disclosure needed), form validation hostility (inline errors after blur), mobile map responsiveness failure (test on real devices).

**Technical debt to avoid:** Never skip clustering, never store lat/lng without PostGIS, never filter large datasets client-side, never mix submission/listing data models in single table, never skip middleware for route protection.

## Implications for Roadmap

Based on combined research, recommended phase structure:

### Phase 0: Foundation & Content Seeding
**Rationale:** Cannot launch empty directory - cold start problem kills adoption. Database schema and initial content must exist before building UI.

**Delivers:**
- PostgreSQL database with PostGIS extension enabled
- Drizzle schema: listings, submissions, categories tables
- 100+ verified initial listings (manual entry via admin tools)
- Categories/roles taxonomy defined
- GiST spatial indexes on location columns

**Addresses features:** Basic Listing Information foundation, Category/Role Organization
**Avoids pitfalls:** Empty Directory Death Spiral (Pitfall #4), Geocoding Validation (Pitfall #3 - validation in place before public submissions)

**Research needs:** Standard patterns - database schema well-documented, no deep research needed

---

### Phase 1: Core Directory MVP (Browse, Search, Map)
**Rationale:** Deliver minimum viable public directory. Users must be able to browse, search, filter, and view listings on map. This validates data model and provides value before opening submissions.

**Delivers:**
- Public homepage with listing grid (Next.js Server Components)
- Individual listing detail pages with contact forms
- Search with PostgreSQL full-text search + typo tolerance
- Multi-criteria filters (category, specialty, location) with URL state
- Interactive Leaflet map with clustered markers
- Mobile-responsive design (Core Web Vitals compliant)
- SEO basics (meta tags, sitemap, LocalBusiness schema)

**Uses stack:** Next.js App Router, Drizzle queries, Leaflet + React Leaflet, nuqs for search params, Tailwind + shadcn/ui components

**Implements architecture:** Public Browse Layer, Search/Filter System, Map Component with PostGIS queries, server-first data fetching

**Avoids pitfalls:** Map Performance Collapse (clustering from day one), Search Doesn't Work (full-text search + fuzzy matching), Mobile Map Failure (real device testing), SEO Neglect (structured data from start)

**Research needs:** Map clustering implementation needs validation (Phase 1 research recommended for marker clustering + viewport filtering patterns)

---

### Phase 2: Submissions & Admin Moderation
**Rationale:** Now that public directory has value, enable community to contribute. Admin workflow required before opening submissions to maintain quality.

**Delivers:**
- Public submission form (React Hook Form + Zod validation)
- Duplicate detection (fuzzy matching on name + address)
- Address validation during submission (Google Address Validation API)
- Map preview: "Is this your location?"
- Admin auth (Clerk integration)
- Admin dashboard with moderation queue
- Approval workflow: pending → approved → published
- Review criteria checklist and status emails
- Admin tools: approve/reject/edit with audit trail

**Uses stack:** Clerk for auth, Zod validation schemas, Google Address Validation API, Server Actions for mutations

**Implements architecture:** Submission Pipeline (separate submissions table), Admin Dashboard, Pending → Approved workflow, middleware for route protection

**Avoids pitfalls:** Duplicate Listing Nightmare (fuzzy matching + claim option), Geocoding Validation (validation API + map preview), Moderation Workflow Chaos (defined criteria + workflow states), Form Validation Hostility (inline errors after blur)

**Research needs:** Minimal - submission forms and admin workflows are standard patterns

---

### Phase 3: Enhanced Features (Portfolios, Verification, Self-Service)
**Rationale:** Core directory proven. Add differentiators that set this apart from basic business directories. Portfolios are critical for historic preservation credibility.

**Delivers:**
- Project Portfolio Showcase: photo galleries per listing
- Before/after project images with descriptions
- Project locations on map (neighborhood/project map)
- Verified Listings: admin verification badge
- Claim & Manage Listing: stakeholders can update own profiles
- Specialties/Skills Taxonomy: granular skill tags
- Advanced filtering: combine category + specialty + location
- Rich Structured Data: comprehensive schema markup

**Uses stack:** Cloudinary for image uploads (or local + Next.js Image optimization), expanded Drizzle schema for projects table

**Implements architecture:** Portfolio data model (projects linked to listings), self-service editing workflow (changes pending approval)

**Avoids pitfalls:** Stale Listing Decay (self-service editing reduces admin burden), Filter Overload (progressive disclosure for advanced filters)

**Research needs:** Phase 3 research recommended for image upload/optimization patterns and portfolio UI best practices

---

### Phase 4: Maintenance & Automation
**Rationale:** Directory now has critical mass. Automate maintenance workflows to reduce admin burden and keep content fresh.

**Delivers:**
- Annual re-verification email campaigns
- Auto-flag listings not verified in 12+ months
- "Report outdated listing" user feedback tool
- Bulk admin actions (approve/reject multiple)
- Search analytics: track "zero results" queries
- Filter usage analytics to prioritize UI
- Email automation (status updates, reminders)

**Uses stack:** Background job processing (for email queues), analytics integration

**Implements architecture:** Scheduled jobs for re-verification, admin bulk operations

**Avoids pitfalls:** Stale Listing Decay (automated re-verification), Admin Dashboard Complexity (usage analytics inform UI improvements)

**Research needs:** Standard patterns - background job scheduling well-documented

---

### Phase Ordering Rationale

**Why this order:**
- **Phase 0 before Phase 1:** Must have data before building UI. Seeding prevents empty directory launch.
- **Phase 1 before Phase 2:** Public directory must demonstrate value before asking community to contribute. Browse/search validates data model.
- **Phase 2 before Phase 3:** Submissions must be moderated before adding complexity of portfolios and self-service editing.
- **Phase 3 before Phase 4:** Automation only valuable once directory has critical mass and content freshness becomes priority.

**Dependency chain:**
- Map view (Phase 1) requires PostGIS setup (Phase 0)
- Admin moderation (Phase 2) requires auth and workflow tooling before opening public submissions
- Project portfolios (Phase 3) enhance map experience but depend on core map infrastructure (Phase 1)
- Self-service editing (Phase 3) requires verification workflow (Phase 2 foundation)
- Automated workflows (Phase 4) build on self-service patterns (Phase 3)

**How this avoids pitfalls:**
- Phase 0 content seeding directly prevents Empty Directory Death Spiral (Pitfall #4)
- Phase 1 clustering implementation prevents Map Performance Collapse (Pitfall #1)
- Phase 2 duplicate detection prevents Duplicate Listing Nightmare (Pitfall #2)
- Phase 2 address validation prevents Geocoding Validation Blindness (Pitfall #3)
- Phase 2 workflow definition prevents Moderation Workflow Chaos (Pitfall #5)
- Phase 3 self-service editing addresses Stale Listing Decay (Pitfall #6)
- Phase 4 automation completes Stale Listing Decay prevention

### Research Flags

**Phases likely needing deeper research during planning:**
- **Phase 1:** Map clustering + viewport filtering - complex integration, test with 500+ markers, verify performance on mobile devices
- **Phase 3:** Image upload/optimization and portfolio UI - need to evaluate Cloudinary vs UploadThing vs local storage trade-offs

**Phases with standard patterns (skip research-phase):**
- **Phase 0:** Database schema - well-documented, Drizzle + PostGIS setup guides available
- **Phase 2:** Submission forms and admin auth - standard patterns, Clerk docs comprehensive
- **Phase 4:** Background jobs - standard scheduling patterns, no novel requirements

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies have official 2026 documentation, version compatibility verified, Next.js + PostgreSQL + Leaflet is proven directory stack |
| Features | MEDIUM | Table stakes features confirmed across multiple directory platforms, but preservation-specific differentiators (portfolios, specialties) inferred from competitor gap analysis rather than direct industry research |
| Architecture | HIGH | Next.js App Router patterns well-documented, PostGIS geospatial queries proven in production directories, server-first approach is 2026 standard |
| Pitfalls | MEDIUM | Map performance and duplicate listing issues well-documented in official sources (Google Maps Platform), moderation and cold start problems based on community consensus rather than official research |

**Overall confidence:** HIGH

The stack, architecture, and critical pitfalls are backed by official documentation and production examples. Feature prioritization has medium confidence because historic preservation-specific needs are inferred from competitor analysis (Historic Seattle, Preservation Mass, DC Preservation League all lack map views and portfolios - identified competitive gap). However, the core directory patterns are consistent across domains.

### Gaps to Address

**Louisville-specific validation needed:**
- **Geocoding bounds:** Test Google Address Validation API with Louisville, KY addresses to confirm accuracy and configure appropriate geographic bounds for submission validation
- **Content sources:** Identify specific sources for initial 100+ listings (Chamber of Commerce membership, Kentucky Heritage Council directory, Historic Preservation Collab existing contacts)
- **Category taxonomy:** Validate proposed stakeholder categories (builders, craftspeople, architects, developers, advocates, government, nonprofits, educators) with Collab staff - may need Louisville-specific roles

**Technical validations during Phase 1:**
- **Marker clustering threshold:** Research suggests 100-500 markers breaks performance, but actual threshold depends on device capabilities and map library - test with target mobile devices (iPhone/Android mid-range)
- **Search relevance tuning:** PostgreSQL full-text search configuration (weights for name vs description vs tags) will need tuning based on actual search behavior once live

**Feature validation post-launch:**
- **Portfolio importance:** Research suggests portfolios are differentiator, but validate with user feedback before investing heavily in Phase 3 implementation
- **Filter usage:** Track which filters users actually use to inform progressive disclosure implementation in Phase 3

**Handling strategy:**
- Louisville-specific items: Address during Phase 0 content seeding via stakeholder interviews
- Technical validations: Address during Phase 1 implementation with realistic test data
- Feature validations: Collect analytics in Phase 1-2, inform Phase 3-4 priorities

## Sources

### Primary (HIGH confidence)

**Official Documentation:**
- Next.js Official Docs (https://nextjs.org/docs) - Framework patterns, App Router architecture
- Next.js 15 Release Notes (https://nextjs.org/blog/next-15) - Version-specific features
- PostgreSQL Official (https://www.postgresql.org/) - Database capabilities
- PostGIS Documentation (https://postgis.net/) - Geospatial extension
- Leaflet Documentation (https://leafletjs.com/) - Mapping library
- React Leaflet (https://react-leaflet.js.org/) - React bindings
- Google Maps Platform Best Practices (https://developers.google.com/maps/) - Performance optimization, geocoding, address validation
- Clerk Documentation (https://clerk.com/docs) - Authentication for Next.js
- shadcn/ui (https://ui.shadcn.com/) - Component library with Tailwind v4 support
- Drizzle ORM (https://orm.drizzle.team/) - Database ORM documentation
- Zod Documentation (https://zod.dev/) - Validation library
- React Hook Form (https://react-hook-form.com/) - Form state management

**Architecture Guides:**
- Next.js Architecture Best Practices (https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- Server and Client Components Patterns (https://nextjs.org/docs/app/getting-started/server-and-client-components)
- Geospatial Search with PostGIS (https://neon.com/guides/geospatial-search)
- Supabase PostGIS Documentation (https://supabase.com/docs/guides/database/extensions/postgis)

### Secondary (MEDIUM confidence)

**Technology Comparisons:**
- PostgreSQL vs MongoDB 2026 (https://www.nucamp.co/blog/mongodb-vs-postgresql-in-2026-nosql-vs-sql-for-full-stack-apps)
- Drizzle vs Prisma 2026 (https://designrevision.com/blog/prisma-vs-drizzle)
- Leaflet vs Mapbox vs Google Maps (https://blog.logrocket.com/react-map-library-comparison/)
- Directory Software Comparison (https://www.capterra.com/directory-software/)
- Testing Strategy 2026 (https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies)

**Feature Research:**
- Directory Feature Standards (https://www.jasminedirectory.com/blog/15-free-business-directories-that-still-matter-in-2026/)
- Business Directory Best Practices (https://birdeye.com/blog/business-directory-listings/)
- Accessibility Compliance 2026 (https://www.accessibility.works/blog/wcag-ada-website-compliance-standards-requirements/)
- Local SEO and Schema Markup (https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/)
- Portfolio Tools for Contractors (https://companycam.com/advanced-features/portfolio)
- Mobile-First UX Design 2026 (https://www.trinergydigital.com/news/mobile-first-ux-design-best-practices-in-2026)

**Pitfall Documentation:**
- Google Maps Marker Clustering (https://developers.google.com/maps/documentation/javascript/marker-clustering)
- Handling Large Datasets with Maps (https://reintech.io/blog/handling-large-datasets-google-maps-marker-clustering)
- Address Validation Best Practices (https://developers.google.com/maps/documentation/address-validation/overview)
- Directory Common Mistakes (https://www.jasminedirectory.com/blog/common-directory-listing-mistakes-to-avoid/)
- Content Moderation Best Practices (https://www.webpurify.com/blog/content-moderation-mistakes-how-to-avoid-them/)
- Form Validation UX (https://cxl.com/blog/form-validation/)
- Search UX Best Practices (https://www.designrush.com/best-designs/websites/trends/search-ux-best-practices)
- Filter Design Patterns (https://www.pencilandpaper.io/articles/ux-pattern-analysis-enterprise-filtering)

### Tertiary (LOW confidence)

**Competitor Analysis:**
- Historic Seattle Preservation Directory (https://historicseattle.org/preservation-professionals/)
- History Colorado Contractors Database (https://www.historycolorado.org/historic-preservation-contractors)
- DC Preservation League Directory (https://dcpreservation.org/contractor-database/)
- Preservation Mass Directory (https://www.preservationmass.org/preservation-directory)
- Washington Trust Directory (https://preservewa.org/resources/preservation-trades-consultants-directory/)

Note: Competitor directories provided category structure and identified feature gaps (none have interactive maps or built-in portfolios), but don't represent official industry standards.

**Community Wisdom:**
- Cold Start Problem Discussion (https://www.educative.io/newsletter/system-design/the-cold-start-problem)
- Directory Population Strategies (https://www.warriorforum.com/main-internet-marketing-discussion-forum/1344232-strategies-populate-directory-website-where-begin.html)
- Directory Mistakes to Avoid (https://marcdumont.com/the-top-10-mistakes-everyone-who-starts-a-directory-website-makes/)

Note: Forum discussions and blog posts validated common pitfalls but represent community consensus rather than peer-reviewed research.

---

*Research completed: 2026-02-12*
*Ready for roadmap: Yes*
*Recommended phases: 4 (Foundation → Core MVP → Enhanced Features → Automation)*
