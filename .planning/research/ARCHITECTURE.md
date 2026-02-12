# Architecture Research

**Domain:** Community directory platform with map integration
**Researched:** 2026-02-12
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Public  │  │  Map     │  │  Search  │  │  Admin   │    │
│  │  Browse  │  │  View    │  │  Filter  │  │Dashboard │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘    │
│       │             │              │             │          │
├───────┴─────────────┴──────────────┴─────────────┴──────────┤
│                    DATA ACCESS LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Next.js API Routes / Server Actions         │    │
│  │  • Listings CRUD  • Search/Filter  • Submissions    │    │
│  │  • Admin Actions  • Geospatial     • Auth           │    │
│  └────────────────────┬────────────────────────────────┘    │
├───────────────────────┴──────────────────────────────────────┤
│                    PERSISTENCE LAYER                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ PostgreSQL │  │  PostGIS   │  │   Auth     │            │
│  │  (Listings)│  │(Geo Index) │  │  Store     │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Public Browse Pages | Display searchable listing grid/list, handle filters, render individual listing detail pages | Next.js Server Components with streaming data |
| Map View | Interactive map with markers for listings, geospatial search/filtering, location-based results | React-Leaflet client component with PostGIS backend |
| Search/Filter UI | Multi-criteria filtering (role, specialty, location), URL-based state management, pagination | Client component using nuqs or useSearchParams |
| Admin Dashboard | Approve/reject submissions, manage listings, edit content, view pending queue | Protected Server Components + Server Actions |
| Data Access Layer | Business logic, database queries, authentication checks, validation | Next.js API Routes or Server Actions |
| Database | Store listings, submissions, categories, users, geospatial data | PostgreSQL with PostGIS extension |

## Recommended Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public route group (no auth)
│   │   ├── page.tsx         # Homepage with search/browse
│   │   ├── map/             # Map view page
│   │   ├── listings/        # Individual listing pages
│   │   │   └── [id]/        # Dynamic listing detail
│   │   └── submit/          # Public submission form
│   ├── (admin)/             # Admin route group (auth required)
│   │   ├── layout.tsx       # Admin layout with sidebar
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── pending/         # Pending submissions
│   │   ├── listings/        # Manage approved listings
│   │   └── settings/        # Admin settings
│   ├── api/                 # API routes (if not using Server Actions)
│   │   ├── listings/        # CRUD endpoints
│   │   ├── submissions/     # Submission handling
│   │   └── search/          # Search/filter endpoints
│   └── middleware.ts        # Route protection, auth checks
├── components/
│   ├── layout/              # Header, Footer, Navigation
│   ├── listings/            # ListingCard, ListingGrid, ListingDetail
│   ├── map/                 # MapView, MapMarker, MapControls
│   ├── search/              # SearchBar, FilterPanel, SortControls
│   ├── admin/               # AdminTable, ApprovalQueue, StatusBadge
│   └── forms/               # SubmissionForm, validation components
├── lib/
│   ├── db/                  # Database client, connection pooling
│   ├── queries/             # Data access functions
│   │   ├── listings.ts      # Listing queries
│   │   ├── submissions.ts   # Submission queries
│   │   └── search.ts        # Search/filter with PostGIS
│   ├── validation/          # Zod schemas, form validation
│   ├── auth/                # Authentication utilities
│   └── utils/               # Shared utilities
├── types/
│   └── index.ts             # TypeScript types/interfaces
└── config/
    ├── categories.ts        # Stakeholder categories config
    └── map.ts               # Map configuration (bounds, defaults)
```

### Structure Rationale

- **Route Groups `(public)` and `(admin)`:** Next.js route groups organize pages by access level without affecting URLs. Enables separate layouts for public browse vs admin dashboard.
- **Colocation:** Components, queries, and logic live near their usage. Listing-related code stays in `listings/`, map-related in `map/`, etc.
- **lib/ Organization:** Data access layer (`db/`, `queries/`) separated from business logic (`validation/`, `utils/`). Server-side code lives here.
- **Middleware:** Single source of truth for route protection. Intercepts requests before pages load to check auth and redirect if needed.

## Architectural Patterns

### Pattern 1: Server-First Data Fetching

**What:** Fetch data in React Server Components, not client-side. Use Next.js's native data fetching instead of creating API routes for internal data.

**When to use:** Always, for listings, search results, submission data — unless you need client-side filtering or real-time updates.

**Trade-offs:**
- **Pros:** Faster initial load, no API endpoints to maintain, secrets stay on server, automatic request deduplication
- **Cons:** Less flexibility for client-side interactions, requires streaming/suspense for slow queries

**Example:**
```typescript
// app/(public)/page.tsx - Server Component
import { getListings } from '@/lib/queries/listings';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { role?: string; specialty?: string };
}) {
  // Data fetched on server, no API call needed
  const listings = await getListings({
    role: searchParams.role,
    specialty: searchParams.specialty,
  });

  return <ListingGrid listings={listings} />;
}
```

### Pattern 2: URL-Based State Management for Filters

**What:** Store search, filter, and pagination state in URL query parameters instead of React state. Sync UI with URL using `useSearchParams` or `nuqs`.

**When to use:** Search/filter UIs, sortable tables, paginated lists — any state you want bookmarkable and shareable.

**Trade-offs:**
- **Pros:** Shareable links, browser back/forward works, persistence across page loads, SEO-friendly
- **Cons:** Slightly more complex than local state, URL can get long with many filters

**Example:**
```typescript
// components/search/FilterPanel.tsx - Client Component
'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export function FilterPanel() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <select onChange={(e) => updateFilter('role', e.target.value)}>
      <option value="">All Roles</option>
      <option value="builder">Builder</option>
      {/* ... */}
    </select>
  );
}
```

### Pattern 3: PostGIS for Geospatial Queries

**What:** Use PostgreSQL with PostGIS extension for location storage, indexing, and spatial queries (distance, bounding box, radius search).

**When to use:** Storing lat/lng coordinates, "near me" searches, map marker filtering, distance calculations.

**Trade-offs:**
- **Pros:** Battle-tested, efficient GiST indexes, 300+ geospatial functions, works with standard Postgres
- **Cons:** Requires PostGIS setup, slightly more complex than storing lat/lng as separate columns

**Example:**
```typescript
// lib/queries/search.ts
import { db } from '@/lib/db';

export async function searchListingsNearLocation(
  lat: number,
  lng: number,
  radiusKm: number = 10
) {
  // PostGIS query using ST_DWithin for radius search
  return db.query(`
    SELECT
      id,
      name,
      ST_Distance(location::geography, ST_MakePoint($1, $2)::geography) / 1000 AS distance_km
    FROM listings
    WHERE ST_DWithin(
      location::geography,
      ST_MakePoint($1, $2)::geography,
      $3 * 1000
    )
    AND status = 'approved'
    ORDER BY distance_km
  `, [lng, lat, radiusKm]);
}
```

### Pattern 4: Pending → Approved → Published Workflow

**What:** Three-state approval workflow: submissions start as `pending`, admins move to `approved` or `rejected`, only `approved` listings appear publicly.

**When to use:** Content moderation, admin approval flows, quality control before public visibility.

**Trade-offs:**
- **Pros:** Clean data, spam prevention, quality control, audit trail
- **Cons:** Requires admin dashboard, slows time-to-publish

**Example:**
```typescript
// lib/queries/submissions.ts
export async function approveSubmission(id: string, adminId: string) {
  // Move from pending to approved, create listing
  await db.transaction(async (tx) => {
    const submission = await tx.query(
      'UPDATE submissions SET status = $1, reviewed_by = $2, reviewed_at = NOW() WHERE id = $3 RETURNING *',
      ['approved', adminId, id]
    );

    // Create listing from approved submission
    await tx.query(
      'INSERT INTO listings (name, contact, role, location, status) SELECT name, contact, role, location, $1 FROM submissions WHERE id = $2',
      ['approved', id]
    );
  });
}
```

### Pattern 5: Separate Layouts for Public vs Admin

**What:** Use Next.js route groups to apply different layouts to public-facing pages vs admin dashboard without affecting URLs.

**When to use:** When public pages need minimal chrome (header/footer) but admin needs sidebar navigation, different auth status, or distinct branding.

**Trade-offs:**
- **Pros:** Clean separation, no URL prefixes needed, isolated layout logic
- **Cons:** None, this is the recommended Next.js pattern

**Example:**
```typescript
// app/(public)/layout.tsx
export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

// app/(admin)/layout.tsx
import { checkAuth } from '@/lib/auth';

export default async function AdminLayout({ children }) {
  await checkAuth(); // Throws if not authenticated
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

## Data Flow

### Public Browse Flow

```
User visits homepage
    ↓
Server Component fetches listings from DB
    ↓
Filter selection updates URL params
    ↓
Page re-renders with new searchParams
    ↓
Server re-fetches filtered results
    ↓
Listings displayed
```

### Submission Flow

```
User fills submission form (client component)
    ↓
Form submits to Server Action or API route
    ↓
Validation (Zod schema)
    ↓
Insert into submissions table (status: pending)
    ↓
Redirect to confirmation page
    ↓
Admin sees submission in pending queue
    ↓
Admin approves/rejects
    ↓
If approved: create listing, update submission status
    ↓
Listing appears in public browse
```

### Map Interaction Flow

```
User pans/zooms map (client component)
    ↓
Map bounds change triggers bounding box query
    ↓
API route or Server Action queries PostGIS
    ↓
  SELECT * FROM listings
  WHERE ST_Within(location, ST_MakeEnvelope(...))
    ↓
Markers update on map
    ↓
Click marker → navigate to listing detail page
```

### Admin Approval Flow

```
Admin dashboard loads pending submissions
    ↓
Server Component queries submissions table WHERE status = 'pending'
    ↓
Admin clicks "Approve" button
    ↓
Server Action: approveSubmission(id, adminId)
    ↓
Transaction:
  1. Update submission (status → approved, log reviewer)
  2. Create listing from submission data
    ↓
Revalidate dashboard and public browse pages
    ↓
Listing appears publicly
```

### Key Data Flows

1. **Public → Database (Read-Heavy):** Most traffic is browsing/searching. Server Components fetch directly from DB, no API layer needed. Cache aggressively with Next.js caching.

2. **Admin → Database (Write):** Approvals, edits, deletions use Server Actions for mutations. Revalidate affected pages after writes.

3. **Map → Geospatial Queries:** Client-side map component calls API route with bounding box. PostGIS returns matching listings. Efficient with GiST spatial indexes.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Monolith is fine. Next.js on Vercel/Railway with managed Postgres (Neon, Supabase). No caching needed beyond Next.js defaults. |
| 1k-10k users | Add Redis for search result caching, optimize PostGIS queries with spatial indexes, enable Vercel Edge caching for static listing pages. |
| 10k-100k users | Move geospatial queries to separate read replicas, implement CDN for images, consider Cloudflare Workers for edge-based search. Database connection pooling becomes critical. |
| 100k+ users | Unlikely for Louisville-specific directory, but: microservices split (listings service, search service, admin service), dedicated geospatial database, full-text search with Algolia/Meilisearch. |

### Scaling Priorities

1. **First bottleneck (1k-10k users):** Database connections exhausted during traffic spikes. Fix with connection pooling (PgBouncer) and caching frequent queries (Redis).

2. **Second bottleneck (10k-100k users):** PostGIS queries slow under load. Fix with read replicas for geospatial queries, materialized views for common searches, and CDN caching for map tiles.

**Reality check:** Louisville metro has ~1.3M people. If 1% of preservation ecosystem uses directory monthly, that's ~1,000 users. Current architecture handles this effortlessly.

## Anti-Patterns

### Anti-Pattern 1: Creating API Routes for Internal Data Fetching

**What people do:** Create API routes (`/api/listings`) then fetch from them in Server Components.

**Why it's wrong:** Adds unnecessary HTTP round-trip, duplicates server-side work, exposes data layer to client misuse, harder to type-check.

**Do this instead:** Query database directly in Server Components. API routes are for external webhooks, client-side mutations, or public APIs only.

```typescript
// BAD
export default async function Page() {
  const res = await fetch('/api/listings');
  const listings = await res.json();
  return <ListingGrid listings={listings} />;
}

// GOOD
import { getListings } from '@/lib/queries/listings';

export default async function Page() {
  const listings = await getListings();
  return <ListingGrid listings={listings} />;
}
```

### Anti-Pattern 2: Storing Lat/Lng as Separate Columns Without PostGIS

**What people do:** Store latitude and longitude as `DECIMAL` columns, query with math formulas for distance.

**Why it's wrong:** Slow at scale (no spatial indexing), inaccurate (flat Earth assumptions), reinvents wheel (PostGIS has 300+ functions).

**Do this instead:** Use PostGIS `GEOGRAPHY` type with GiST index. Built-in functions handle spherical calculations correctly.

```sql
-- BAD
CREATE TABLE listings (
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6)
);

-- GOOD
CREATE TABLE listings (
  location GEOGRAPHY(Point, 4326)
);
CREATE INDEX idx_listings_location ON listings USING GIST(location);
```

### Anti-Pattern 3: Client-Side Filtering of Large Datasets

**What people do:** Fetch all listings to client, filter/sort in JavaScript.

**Why it's wrong:** Slow initial load, wastes bandwidth, breaks with 1000+ listings, no pagination, SEO suffers.

**Do this instead:** Filter on server (SQL WHERE clauses), paginate results, pass filters via URL params to Server Components.

```typescript
// BAD
'use client';
export default function Page() {
  const [allListings, setAllListings] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/listings').then(r => r.json()).then(setAllListings);
  }, []);

  const filtered = allListings.filter(l => l.role === filter);
  return <ListingGrid listings={filtered} />;
}

// GOOD
// Server Component
export default async function Page({ searchParams }) {
  const listings = await getListings({ role: searchParams.role });
  return <ListingGrid listings={listings} />;
}
```

### Anti-Pattern 4: Mixing Submission and Listing Data Models

**What people do:** Single `listings` table with `status` field for both submissions and live listings. Clutters queries.

**Why it's wrong:** Complex queries (always filtering WHERE status = 'approved'), hard to audit changes, mixes concerns (submissions vs published content).

**Do this instead:** Separate `submissions` and `listings` tables. Submissions become listings on approval. Clear separation of concerns.

```sql
-- BAD
CREATE TABLE listings (
  id UUID PRIMARY KEY,
  status VARCHAR CHECK (status IN ('pending', 'approved', 'rejected')),
  -- Public queries always need WHERE status = 'approved'
);

-- GOOD
CREATE TABLE submissions (
  id UUID PRIMARY KEY,
  status VARCHAR CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID,
  reviewed_at TIMESTAMP
);

CREATE TABLE listings (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES submissions(id),
  -- All rows here are approved by definition
);
```

### Anti-Pattern 5: Skipping Middleware for Route Protection

**What people do:** Check auth in every admin page's Server Component manually.

**Why it's wrong:** Repetitive, easy to forget, inconsistent enforcement, leaks data if forgotten.

**Do this instead:** Use Next.js middleware to intercept requests before rendering. Single source of truth for route protection.

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminRoutes = ['/dashboard', '/pending', '/settings'];
  const isAdminRoute = adminRoutes.some(route =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isAdminRoute) {
    const token = request.cookies.get('auth-token');
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
```

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Leaflet (via React-Leaflet) | Client component wrapper, dynamic import for SSR safety | Use `dynamic(() => import('...'), { ssr: false })` to avoid window/document errors |
| OpenStreetMap Tiles | Direct tile server URL in Leaflet config | Free, no API key, rate limits apply |
| Mapbox (alternative) | API key in env vars, Mapbox GL JS via npm | Better styling, costs money, 50k free tile loads/month |
| PostGIS | PostgreSQL extension, enable with `CREATE EXTENSION postgis` | Requires Postgres 12+, supported by Neon/Supabase/Railway |
| NextAuth.js (for admin auth) | Next.js API route (`/api/auth/[...nextauth]`), session management | Simplest for admin-only auth, supports multiple providers |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Server Component ↔ Database | Direct SQL or ORM (Drizzle/Prisma) | Fastest, no HTTP overhead |
| Client Component ↔ Server Action | Form actions or `useTransition` | Recommended for mutations in App Router |
| Map Component ↔ Search API | Fetch from API route with bounding box params | Client-side map needs async data, can't use Server Components |
| Admin UI ↔ Approval Logic | Server Actions for approve/reject | Type-safe, no API routes needed |

## Build Order Implications

**Recommended Phase Sequence:**

1. **Database Schema + Seed Data** — Can't build UI without data structure. PostGIS setup first.
2. **Public Browse (No Filters)** — Basic listing grid, detail pages. Validates data model.
3. **Search/Filter** — URL-based state, server-side filtering. Builds on browse foundation.
4. **Map View** — Integrates PostGIS queries, geospatial indexes. Requires working search.
5. **Submission Form** — Writes to `submissions` table. Independent of admin approval.
6. **Admin Auth + Dashboard** — Route protection, approval workflow. Needs submissions to approve.
7. **Polish** — SEO, performance, mobile UX. Final layer.

**Key Dependencies:**
- Map View requires geospatial queries (PostGIS setup)
- Admin Dashboard requires auth (NextAuth or similar)
- Submission Form can exist before admin approval (just stores as pending)
- Search/Filter should use URL state from the start (refactoring later is painful)

## Sources

### Architecture Patterns
- [Modern Web Application Architecture in 2026: A Practical Guide](https://quokkalabs.com/blog/modern-web-application-architecture/)
- [Next.js Architecture in 2026 — Server-First, Client-Islands, and Scalable App Router Patterns](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router)
- [Next.js: The Complete Guide for 2026 | DevToolbox Blog](https://devtoolbox.dedyn.io/blog/nextjs-complete-guide)

### Next.js Specific
- [Getting Started: Project Structure | Next.js](https://nextjs.org/docs/app/getting-started/project-structure)
- [Next js Folder Structure Best Practices for Scalable Applications (2026 Guide)](https://www.codebydeep.com/blog/next-js-folder-structure-best-practices-for-scalable-applications-2026-guide)
- [Getting Started: Server and Client Components | Next.js](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Building a Secure & Scalable BFF (Backend-for-Frontend) Architecture with Next.js API Routes](https://vishal-vishal-gupta48.medium.com/building-a-secure-scalable-bff-backend-for-frontend-architecture-with-next-js-api-routes-cbc8c101bff0)

### Authentication & Authorization
- [Setting up Auth and Role-Based Access Control in Next.js + Payload](https://payloadcms.com/posts/guides/setting-up-auth-and-role-based-access-control-in-nextjs-payload)
- [Building a Scalable Dashboard in Next.js with Role-Based Access and Language Support](https://medium.com/@shankhwarshipra2001/building-a-scalable-dashboard-in-next-js-with-role-based-access-and-language-support-755f5bccb9dd)

### Geospatial Architecture
- [PostGIS: Geo queries | Supabase Docs](https://supabase.com/docs/guides/database/extensions/postgis)
- [Geospatial Search in Postgres - Neon Guides](https://neon.com/guides/geospatial-search)
- [Postgres Geospatial: A Complete Guide to Spatial Data with PostGIS](https://www.geowgs84.ai/post/postgres-geospatial-a-complete-guide-to-spatial-data-with-postgis)

### Map Integration
- [React components for Leaflet maps | React Leaflet](https://react-leaflet.js.org/)
- [Use Mapbox GL JS in a React app | Help | Mapbox](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/)
- [How to create OSM-based Map with React | Geoapify](https://www.geoapify.com/tutorial/react-leaflet-mapbox-maplibre-openlayers/)

### State Management & Search
- [nuqs | Type-safe search params state management for React](https://nuqs.dev/)
- [Why URL state matters: A guide to useSearchParams in React - LogRocket Blog](https://blog.logrocket.com/url-state-usesearchparams/)
- [App Router: Adding Search and Pagination | Next.js](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)

### Approval Workflows
- [Approval Process: Ultimate Guide to Automated Approval Processes 2026](https://kissflow.com/workflow/approval-process/)
- [Manage workflow requests and approvals | Microsoft Learn](https://learn.microsoft.com/en-us/purview/legacy/how-to-workflow-manage-requests-approvals)

### Directory & Database Schemas
- [Database Schema: Complete Guide to Structure, Design, and Implementation | Databricks](https://www.databricks.com/glossary/database-schema)
- [What Is a Membership Directory? How to Create One for Your Organization](https://joinit.com/blog/what-is-a-membership-directory)

---
*Architecture research for: NextGen Preservation Collab Directory*
*Researched: 2026-02-12*
