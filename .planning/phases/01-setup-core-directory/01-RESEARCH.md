# Phase 1: Setup & Core Directory - Research

**Researched:** 2026-02-12
**Domain:** Next.js directory platform with geospatial search and interactive mapping
**Confidence:** HIGH

## Summary

Phase 1 establishes the foundation for the NextGen Preservation Collab Directory: a publicly browsable, searchable directory with interactive map integration. This phase delivers the core user experience — finding and connecting with Louisville's historic preservation stakeholders — without submission or admin workflows (those come in Phase 2).

The technical domain is well-established: Next.js 15+ App Router for the application framework, PostgreSQL with PostGIS for geospatial data, Leaflet for mapping, and Tailwind CSS with shadcn/ui for the interface. The primary risks are map performance at scale, geocoding accuracy, and launching with empty content.

**Primary recommendation:** Build with production patterns from day one — marker clustering, fuzzy duplicate detection, address validation, and full-text search cannot be retrofitted easily. Seed 100+ verified listings before public launch to avoid the "empty directory death spiral."

## Standard Stack

### Core Framework
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x (stable) | Full-stack React framework | Industry standard for directory apps in 2026. App Router provides server-first architecture ideal for public directories. Built-in features: file-based routing, server components, API routes, image optimization. Next.js 15 is production-ready. |
| React | 19.x | UI library | Required by Next.js 15+. Modern concurrent features. Server/Client component split ideal for directory with public listings. |
| TypeScript | 5.x | Type safety | De facto standard for production Next.js in 2026. Essential for form validation schemas and database typing. |
| Node.js | 20.x LTS or 22.x | Runtime | Next.js requires Node 18.17+. Use LTS for stability. |

**Sources:** [Next.js Official Docs](https://nextjs.org/docs), [Next.js 15 Release](https://nextjs.org/blog/next-15)

### Database
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| PostgreSQL | 15.x or 16.x | Primary database | Relational structure perfect for directory listings (structured stakeholder data). ACID compliance for admin approval workflows. PostGIS extension for geospatial queries. PostgreSQL is the safer default for 2026 with 55.6% developer adoption. |
| PostGIS | 3.x | Geospatial extension | Essential for location-based search and interactive map features. Provides spatial indexing (GiST), distance calculations, bounding box queries. Open-source, battle-tested for directory apps. |
| Drizzle ORM | Latest | Database ORM | Code-first TypeScript ORM. Zero runtime overhead, tiny bundle (edge-ready). SQL-like API with full type safety. Better for serverless than Prisma due to smaller footprint. Recommended for new Next.js projects in 2026. |

**Sources:** [PostgreSQL comparison](https://www.nucamp.co/blog/mongodb-vs-postgresql-in-2026-nosql-vs-sql-for-full-stack-apps), [PostGIS docs](https://postgis.net/), [Drizzle vs Prisma 2026](https://makerkit.dev/blog/tutorials/drizzle-vs-prisma)

**Alternative:** Prisma 6.x if team prefers schema-first approach and wants Prisma Studio GUI. Has larger footprint but gentler learning curve.

### Map Integration
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Leaflet | 1.9.x | Interactive map library | Open-source, zero cost, lightweight (42KB gzipped). No usage limits or API keys for basic maps. Perfect for community directory budget. Mobile-friendly, extensive plugin ecosystem. |
| React Leaflet | 4.x | React wrapper for Leaflet | Official React bindings for Leaflet. Declarative API fits React patterns. Active maintenance. |
| OpenStreetMap | — | Map tile provider | Free tile provider for Leaflet. Community-driven, no billing surprises. Good coverage for Louisville, KY. |
| Supercluster | Latest | Marker clustering | Fast marker clustering library. Essential for map performance with 100+ listings. Prevents UI freeze on mobile devices. |

**Sources:** [Leaflet comparison 2026](https://blog.logrocket.com/react-map-library-comparison/), [Mapping libraries comparison](https://retool.com/blog/react-map-library)

**Alternative Maps:**
- **Mapbox GL JS**: If you need advanced styling/vector tiles. Free tier: 50K map loads/month. Better performance but introduces vendor dependency.
- **Google Maps**: Avoid unless specific feature required. Limited free tier, expensive at scale.

### UI & Styling
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Tailwind CSS | 4.x | Utility-first CSS | Industry standard for modern Next.js apps. Fast development, consistent design system, excellent mobile-first approach. Tailwind v4 stable as of 2026 with OKLCH colors and @theme directive. |
| shadcn/ui | Latest | Component library | Copy-paste React components (not npm package). Built on Radix UI + Tailwind. Full ownership of code. Updated for Tailwind v4 and React 19 in 2026. Thousands of production-ready blocks available. |
| Radix UI | Latest | Unstyled primitives | Accessible component primitives (used by shadcn/ui). WCAG compliant, keyboard navigation, screen reader support. |

**Sources:** [shadcn/ui Tailwind v4 support](https://ui.shadcn.com/docs/tailwind-v4), [shadcn/ui overview](https://thecodebeast.com/shadcn-ui-the-component-library-that-finally-puts-developers-in-control/)

### Search & Filtering
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| nuqs | Latest | Search param state management | Type-safe URL search params for Next.js App Router. Clean approach to filter state without prop drilling. Supports server-side rendering. |
| use-debounce | Latest | Search input optimization | Debounce search queries (300ms standard). Prevents excessive re-renders and database queries. |
| PostgreSQL Full-Text Search | Built-in | Text search capabilities | Native Postgres feature. No external service needed. Good enough for directory search (names, specialties, descriptions). |

**Sources:** [Next.js search filtering](https://aurorascharff.no/posts/managing-advanced-search-param-filtering-next-app-router/), [Next.js search tutorial](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)

**Alternative Search:** Algolia or Typesense if full-text search becomes inadequate. Defer until needed (YAGNI).

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | Latest | Conditional classNames | Combine Tailwind classes dynamically. Used by shadcn/ui. |
| tailwind-merge | Latest | Merge Tailwind classes | Prevent class conflicts. Pairs with clsx. |
| date-fns | Latest | Date formatting | Lightweight alternative to Moment.js. Display submission dates, last updated. |
| lucide-react | Latest | Icon library | Modern icon set. Tree-shakeable. Used by shadcn/ui. |
| Zod | 4.x | Schema validation | TypeScript-first runtime validation. Essential for validating URL params, data integrity. Phase 2 will use heavily for forms. |

### Deployment & Infrastructure
| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| Vercel | — | Hosting platform | Created by Next.js team. Zero-config deployment. Edge network, preview deployments, automatic HTTPS. Free tier suitable for community directory. |
| Neon or Supabase | — | Managed PostgreSQL | Serverless Postgres with generous free tier. PostGIS support. Auto-scaling. Neon focuses on Postgres; Supabase adds auth/storage if needed later. |
| GitHub | — | Git hosting + CI/CD | Vercel integrates with GitHub for automatic deployments. Preview deployments on PR. |

**Sources:** [Vercel Next.js docs](https://vercel.com/docs/frameworks/full-stack/nextjs), [Neon geospatial guide](https://neon.com/guides/geospatial-search), [Supabase PostGIS docs](https://supabase.com/docs/guides/database/extensions/postgis)

**Alternative Deployment:**
- **Self-hosted (Docker)**: If you need full control or have existing infrastructure.
- **Railway, Render, or Fly.io**: Good Vercel alternatives with PostgreSQL included.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public route group (no auth)
│   │   ├── page.tsx         # Homepage with search/browse
│   │   ├── map/             # Map view page
│   │   ├── listings/        # Individual listing pages
│   │   │   └── [id]/        # Dynamic listing detail
│   │   └── layout.tsx       # Public layout (header/footer)
│   └── api/                 # API routes (if needed)
│       └── listings/        # Geospatial queries for map
├── components/
│   ├── layout/              # Header, Footer, Navigation
│   ├── listings/            # ListingCard, ListingGrid, ListingDetail
│   ├── map/                 # MapView, MapMarker, MapControls
│   └── search/              # SearchBar, FilterPanel, SortControls
├── lib/
│   ├── db/                  # Database client, connection pooling
│   ├── queries/             # Data access functions
│   │   ├── listings.ts      # Listing queries
│   │   └── search.ts        # Search/filter with PostGIS
│   ├── validation/          # Zod schemas
│   └── utils/               # Shared utilities
├── types/
│   └── index.ts             # TypeScript types/interfaces
└── config/
    ├── categories.ts        # Stakeholder categories config
    └── map.ts               # Map configuration (bounds, defaults)
```

### Pattern 1: Server-First Data Fetching

**What:** Fetch data in React Server Components, not client-side. Use Next.js's native data fetching instead of creating API routes for internal data.

**When to use:** Always, for listings, search results — unless you need client-side filtering or real-time updates.

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

**Trade-offs:**
- **Pros:** Faster initial load, no API endpoints to maintain, secrets stay on server, automatic request deduplication
- **Cons:** Less flexibility for client-side interactions, requires streaming/suspense for slow queries

### Pattern 2: URL-Based State Management for Filters

**What:** Store search, filter, and pagination state in URL query parameters instead of React state. Sync UI with URL using `useSearchParams` or `nuqs`.

**When to use:** Search/filter UIs, sortable tables, paginated lists — any state you want bookmarkable and shareable.

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

**Trade-offs:**
- **Pros:** Shareable links, browser back/forward works, persistence across page loads, SEO-friendly
- **Cons:** Slightly more complex than local state, URL can get long with many filters

### Pattern 3: PostGIS for Geospatial Queries

**What:** Use PostgreSQL with PostGIS extension for location storage, indexing, and spatial queries (distance, bounding box, radius search).

**When to use:** Storing lat/lng coordinates, "near me" searches, map marker filtering, distance calculations.

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

**Trade-offs:**
- **Pros:** Battle-tested, efficient GiST indexes, 300+ geospatial functions, works with standard Postgres
- **Cons:** Requires PostGIS setup, slightly more complex than storing lat/lng as separate columns

### Pattern 4: Marker Clustering from Day One

**What:** Use marker clustering library (Supercluster or @googlemaps/markerclusterer) to group nearby markers at different zoom levels.

**When to use:** ANY map with >50 markers. Don't wait for performance problems — build it from the start.

**Example:**
```typescript
// components/map/MapView.tsx
'use client';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

export function MapView({ listings }: { listings: Listing[] }) {
  return (
    <MapContainer center={[38.2527, -85.7585]} zoom={12}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.latitude, listing.longitude]}
          />
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
```

**Trade-offs:**
- **Pros:** Smooth performance at any scale, better UX (reduces marker clutter), mobile-friendly
- **Cons:** Slight complexity, requires library integration

**Critical:** This pattern prevents the #1 pitfall in directory apps with maps (see Common Pitfalls below).

### Pattern 5: Separate Layouts for Public vs Admin (Future)

**What:** Use Next.js route groups to apply different layouts to public-facing pages vs admin dashboard without affecting URLs.

**When to use:** Phase 2 when admin features are added.

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
```

**Note:** Phase 1 only has public routes, so single layout is sufficient. This pattern becomes critical in Phase 2.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Marker clustering | Custom marker grouping logic | Supercluster or react-leaflet-cluster | Edge cases: different zoom levels, dynamic reclustering, performance optimization for thousands of points. Library handles all this. |
| Geocoding | Manual lat/lng lookup | Google Geocoding API or Nominatim (OpenStreetMap) | Address parsing is deceptively complex: abbreviations, typos, ambiguous addresses, international formats. Use proven service. |
| Address validation | String comparison for duplicates | Google Address Validation API or Nominatim | Needs to handle "123 Main St" vs "123 Main Street", different cities with same street names, geocoding confidence scoring. |
| Full-text search | SQL LIKE queries | PostgreSQL full-text search (tsvector) or dedicated service | Typo tolerance, relevance ranking, multi-field search, performance at scale. Native Postgres FTS sufficient for Phase 1. |
| Duplicate detection | Exact string matching | Fuzzy matching (Levenshtein distance, trigram similarity) | Catches "Historic Masonry LLC" vs "Historic Masonry" vs "Historic Masonry, LLC". Built-in Postgres similarity functions available. |
| Image optimization | Manual resizing | Next.js Image component | Automatic responsive images, lazy loading, format selection (WebP), CDN integration. Built-in feature. |
| URL state management | useState + router.push | nuqs or useSearchParams | Type-safe params, SSR compatibility, sync issues between URL and state. nuqs handles edge cases. |

**Key insight:** Geospatial, search, and deduplication problems have many edge cases. Use battle-tested libraries instead of custom solutions.

## Common Pitfalls

### Pitfall 1: Map Performance Collapse at Scale

**What goes wrong:** Map renders slowly or freezes as listings grow. Initial development with 10-20 test markers works fine, but performance craters when 100+ real listings are added.

**Why it happens:** Developers render all markers individually without clustering. Each marker adds event listeners and DOM elements, creating a performance bottleneck.

**How to avoid:**
- Implement marker clustering from day one using Supercluster or react-leaflet-cluster
- Load markers only within viewport bounds using map.getBounds()
- Use raster image icons (.png, .jpg) instead of SVG for better rendering performance
- Test with 500+ markers during development, not 10-20
- Set hard limit: if displaying >100 markers without clustering, implement clustering immediately

**Warning signs:**
- Map initialization takes >2 seconds
- Frame rate drops during pan/zoom on development machine
- Console shows thousands of DOM nodes in map container
- Mobile testing reveals significant lag

**Phase to address:** Phase 1 (Core Directory MVP) - Build with clustering from start, not as later optimization.

**Source:** [Google Maps Platform best practices](https://mapsplatform.google.com/resources/blog/google-maps-platform-best-practices-optimization-and-performance-tips/), [Handling Large Datasets](https://reintech.io/blog/handling-large-datasets-google-maps-marker-clustering)

### Pitfall 2: The Duplicate Listing Nightmare

**What goes wrong:** Multiple listings exist for the same business/professional. Users submit new listings instead of claiming/updating existing ones. Database fills with near-duplicates: "Historic Masonry LLC", "Historic Masonry", "Historic Masonry, LLC" as separate entries.

**Why it happens:**
- No duplicate detection during submission flow
- Fuzzy matching not implemented (exact string match only)
- Address variations not normalized (123 Main St vs 123 Main Street)

**How to avoid:**
- Implement fuzzy name matching during submission (Levenshtein distance, trigram similarity)
- Normalize addresses before storage (use geocoding API to standardize format)
- Use unique constraints on normalized business name + address combination
- Build admin "Merge duplicates" tool in Phase 2

**Warning signs:**
- Search returns multiple entries for obviously same business
- Database query shows LIKE '%historic masonry%' returns 3+ results

**Phase to address:** Phase 1 foundation (normalized storage), Phase 2 (duplicate detection during submission).

**Source:** [How to Fix Duplicate Listings](https://hibu.com/blog/marketing-tips/how-to-fix-duplicate-listings-and-why-they-happen-in-the-first-place), [Common Directory Listing Mistakes](https://www.jasminedirectory.com/blog/common-directory-listing-mistakes-to-avoid/)

### Pitfall 3: Geocoding Validation Blindness

**What goes wrong:** Users submit addresses that geocode incorrectly or not at all. "123 Main Street, Louisville" geocodes to Louisville, CO instead of Louisville, KY. Markers appear in oceans or wrong states.

**Why it happens:**
- Using geocoding API without validation API
- Trusting user-entered addresses without verification
- Not constraining geographic bounds
- Accepting first geocoding result without confidence scoring

**How to avoid:**
- Use Google Address Validation API, not just Geocoding API (provides correction suggestions)
- Implement geographic bounds (constrain to Louisville metro area)
- Require minimum confidence score for auto-acceptance (e.g., Google "ROOFTOP" precision)
- Show map preview during submission: "Is this your location?"
- Store both user-entered and normalized addresses

**Warning signs:**
- Listings clustered in wrong cities
- Map markers in unexpected locations (ocean, other countries)
- High rate of user-reported location errors

**Phase to address:** Phase 2 (when submissions enabled). Phase 1 seed data can be manually verified.

**Source:** [Geocoding Best Practices](https://developers.google.com/maps/documentation/geocoding/best-practices), [Address Validation API](https://developers.google.com/maps/documentation/address-validation/overview)

### Pitfall 4: The Empty Directory Death Spiral

**What goes wrong:** Launch with zero or few listings. Users visit, see empty results, leave permanently. Professionals won't submit to empty directory ("no traffic"). Classic cold start problem kills traction before it begins.

**Why it happens:**
- Launching public site before seeding initial content
- Assuming "if we build it, they will come"
- No strategy for initial data population

**How to avoid:**
- Seed directory with 100+ initial listings BEFORE public launch (Phase 3 requirement)
- Work with Historic Preservation Collab staff to identify key professionals
- Import from existing resources (Chamber of Commerce, trade associations)
- Set internal milestone: "Don't launch until 100 verified listings"
- Consider "soft launch" to Collab members first, public second

**Warning signs:**
- Launch plan shows "go live, then get listings"
- No content strategy in project plan
- Search results consistently return "No results found"

**Phase to address:** Phase 3 (Content & Polish) - MUST complete before public launch.

**Source:** [The Cold Start Problem](https://www.educative.io/newsletter/system-design/the-cold-start-problem), [Strategies to Populate a Directory](https://www.warriorforum.com/main-internet-marketing-discussion-forum/1344232-strategies-populate-directory-website-where-begin.html)

### Pitfall 5: Search That Doesn't Search

**What goes wrong:** Users can't find listings they know exist. Search requires exact name match. Typos return zero results. No fuzzy matching, no synonym support, no relevance ranking.

**Why it happens:**
- Implementing basic SQL LIKE '%term%' search
- No full-text search indexing
- No typo tolerance or fuzzy matching
- Results not ranked by relevance

**How to avoid:**
- Use proper search engine: PostgreSQL full-text search (sufficient for Phase 1)
- Implement typo tolerance (Levenshtein distance <2 auto-corrects)
- Index multiple fields: name, description, tags, category, address
- Rank results by relevance (name match > description match)
- Test with misspellings during development
- Track "zero results" queries to identify gaps

**Warning signs:**
- User searches return "No results" but listing exists
- Exact name matches work, slight typos fail
- Users browsing instead of searching

**Phase to address:** Phase 1 (Core Directory MVP) - Search is table stakes. Basic implementation in Phase 1.

**Source:** [Search UX Best Practices](https://www.designrush.com/best-designs/websites/trends/search-ux-best-practices), [Search Functionality Requirements](https://www.fastsimon.com/ecommerce-wiki/site-search/essential-search-functionality-requirements-for-a-seamless-website/)

### Pitfall 6: Mobile Map Responsiveness Failure

**What goes wrong:** Map renders incorrectly on mobile: cut off, wrong height, markers mispositioned. Responsive design tested on desktop resize, but fails on actual mobile devices.

**How to avoid:**
- Test on real mobile devices, not just browser DevTools
- Use percentage-based heights, not fixed pixels
- Lazy load map: only initialize when scrolled into view
- Reduce tile complexity for mobile bandwidth
- Implement touch-friendly controls (larger zoom buttons)
- Consider separate mobile map layout (full-screen modal vs sidebar)

**Warning signs:**
- Map height incorrect on mobile
- Touch gestures don't work smoothly
- Map loads slowly on mobile

**Phase to address:** Phase 1 (Core Directory MVP) - Mobile responsiveness is a success criterion.

**Source:** [Mobile Map Performance](https://medium.com/@animagun/optimizing-mobile-map-performance-strategies-for-blazing-fast-map-loading-ca6e0db210ec), [Responsive Map Design](https://www.maplibrary.org/10067/7-best-practices-for-responsive-map-design/)

### Pitfall 7: SEO Structured Data Neglect

**What goes wrong:** Listings don't appear in Google's rich results. No schema markup implemented. Missed opportunity for enhanced search visibility.

**How to avoid:**
- Implement LocalBusiness schema on every listing
- Include required properties: name, address, telephone, image
- Use Google's Structured Data Testing Tool before launch
- Add breadcrumb schema for navigation
- Validate monthly via Google Search Console

**Warning signs:**
- Listings don't show rich snippets in Google
- Google Search Console reports structured data errors
- No schema markup in page source

**Phase to address:** Phase 1 (Core Directory MVP) - SEO optimization is a success criterion (UX-02).

**Source:** [Schema Markup in 2026](https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/), [Common Structured Data Errors](https://www.seoclarity.net/blog/structured-data-common-issues)

## Code Examples

Verified patterns from official sources.

### Next.js App Router Server Component with Search Params

```typescript
// app/(public)/page.tsx
import { getListings } from '@/lib/queries/listings';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { SearchBar } from '@/components/search/SearchBar';
import { FilterPanel } from '@/components/search/FilterPanel';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { q?: string; role?: string; specialty?: string };
}) {
  const listings = await getListings({
    query: searchParams.q,
    role: searchParams.role,
    specialty: searchParams.specialty,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Louisville Preservation Directory
      </h1>
      <SearchBar defaultValue={searchParams.q} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        <aside>
          <FilterPanel />
        </aside>
        <main className="lg:col-span-3">
          <ListingGrid listings={listings} />
        </main>
      </div>
    </div>
  );
}
```

**Source:** [Next.js App Router Documentation](https://nextjs.org/docs/app/building-your-application/routing)

### PostGIS Query for Map Bounding Box

```typescript
// lib/queries/search.ts
import { db } from '@/lib/db';

export async function getListingsInBounds(
  north: number,
  south: number,
  east: number,
  west: number
) {
  // PostGIS query using ST_MakeEnvelope for bounding box
  return db.query(`
    SELECT
      id,
      name,
      role,
      ST_X(location::geometry) AS longitude,
      ST_Y(location::geometry) AS latitude
    FROM listings
    WHERE ST_Within(
      location,
      ST_MakeEnvelope($1, $2, $3, $4, 4326)
    )
  `, [west, south, east, north]);
}
```

**Source:** [PostGIS Documentation](https://postgis.net/docs/ST_MakeEnvelope.html), [Neon Geospatial Guide](https://neon.com/guides/geospatial-search)

### PostgreSQL Full-Text Search

```typescript
// lib/queries/search.ts
export async function searchListings(query: string) {
  // PostgreSQL full-text search with ts_vector
  return db.query(`
    SELECT
      id,
      name,
      description,
      role,
      ts_rank(search_vector, plainto_tsquery('english', $1)) AS rank
    FROM listings
    WHERE search_vector @@ plainto_tsquery('english', $1)
    ORDER BY rank DESC
    LIMIT 50
  `, [query]);
}

// Migration to add full-text search column
// CREATE INDEX idx_listings_search ON listings USING GIN(search_vector);
// UPDATE listings SET search_vector =
//   to_tsvector('english', name || ' ' || description || ' ' || role);
```

**Source:** [PostgreSQL Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)

### Leaflet Map with React and Clustering

```typescript
// components/map/MapView.tsx
'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const MarkerClusterGroup = dynamic(
  () => import('react-leaflet-cluster'),
  { ssr: false }
);

export function MapView({ listings }: { listings: Listing[] }) {
  const bounds = useMemo(() => {
    if (listings.length === 0) return undefined;
    return listings.map((l) => [l.latitude, l.longitude]);
  }, [listings]);

  return (
    <MapContainer
      center={[38.2527, -85.7585]} // Louisville, KY
      zoom={12}
      className="h-96 w-full rounded-lg"
      bounds={bounds}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {listings.map((listing) => (
          <Marker
            key={listing.id}
            position={[listing.latitude, listing.longitude]}
          >
            <Popup>
              <a href={`/listings/${listing.id}`}>
                <strong>{listing.name}</strong>
                <br />
                {listing.role}
              </a>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
```

**Source:** [React Leaflet Documentation](https://react-leaflet.js.org/), [react-leaflet-cluster](https://www.npmjs.com/package/react-leaflet-cluster)

### LocalBusiness Schema Markup

```typescript
// app/(public)/listings/[id]/page.tsx
import { getListing } from '@/lib/queries/listings';

export default async function ListingPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await getListing(params.id);

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: listing.name,
    description: listing.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: 'Louisville',
      addressRegion: 'KY',
      postalCode: listing.zipCode,
      addressCountry: 'US',
    },
    telephone: listing.phone,
    email: listing.email,
    url: listing.website,
    image: listing.imageUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: listing.latitude,
      longitude: listing.longitude,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      {/* Listing content */}
    </>
  );
}
```

**Source:** [Schema.org LocalBusiness](https://schema.org/LocalBusiness), [Google Structured Data Guide](https://developers.google.com/search/docs/appearance/structured-data/local-business)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router | App Router | Next.js 13 (2022), stable in 14-15 | Server Components default, better data fetching patterns, file-based layouts |
| Client-side data fetching | Server Components | Next.js 13+ | Faster initial loads, no loading states needed, secrets stay on server |
| CSS Modules | Tailwind CSS | Became standard ~2020-2021 | Faster development, better consistency, mobile-first by default |
| Moment.js | date-fns | ~2019-2020 | Smaller bundle, tree-shakeable, modern API |
| Jest | Vitest | 2023-2024 | Faster tests, better ESM support, Next.js integration |
| Prisma only | Drizzle or Prisma | 2024-2026 | Drizzle lighter for edge/serverless, both valid choices |
| Google Maps only | Leaflet + OSM | Ongoing | Cost savings, no vendor lock-in for basic use cases |

**Deprecated/outdated:**
- **Create React App**: Deprecated, no longer maintained. Use Next.js or Vite.
- **Pages Router**: Still supported but App Router is the future for new projects.
- **Styled Components/CSS-in-JS**: Tailwind has become the standard for new projects.
- **Moment.js**: Too large, use date-fns or native Intl API.

## Open Questions

1. **Should we use Mapbox instead of Leaflet for better styling?**
   - What we know: Leaflet is free and unlimited. Mapbox has better vector tiles and styling options but costs money after 50K loads/month.
   - What's unclear: Will Collab want advanced map customization that justifies Mapbox cost?
   - Recommendation: Start with Leaflet. Migration to Mapbox is straightforward if needed later. Leaflet sufficient for MVP.

2. **Should we implement address autocomplete during search/filter?**
   - What we know: Google Places Autocomplete provides UX benefit but requires API key and costs money.
   - What's unclear: Do users need to search by partial addresses, or are category/specialty filters sufficient?
   - Recommendation: Defer to Phase 2 or post-MVP. Category and specialty filters handle most use cases. Autocomplete is enhancement, not requirement.

3. **How many categories should we support initially?**
   - What we know: Project context lists 10 stakeholder categories (Builder, Craftsperson, Tradesperson, Developer, Investor, Advocate, Architect, Government, Nonprofit, Educator).
   - What's unclear: Will these categories prove sufficient, or will community need more granular options?
   - Recommendation: Start with 10 defined categories. Make category list configurable (not hardcoded). Plan to expand based on community feedback in Phase 2+.

4. **Should listings support multiple locations?**
   - What we know: Most preservation professionals operate from one primary location.
   - What's unclear: Do some stakeholders (e.g., architects) need to show multiple office locations or project sites?
   - Recommendation: Single primary location for Phase 1. Can extend to multiple locations in Phase 2 if needed. Simpler data model for MVP.

## Sources

### Primary (HIGH confidence)
- [Next.js Official Docs](https://nextjs.org/docs) - Framework documentation
- [Next.js 15 Release](https://nextjs.org/blog/next-15) - Version 15 features
- [PostgreSQL Official](https://www.postgresql.org/) - Database documentation
- [PostGIS Documentation](https://postgis.net/) - Geospatial extension
- [Leaflet Documentation](https://leafletjs.com/) - Mapping library
- [React Leaflet](https://react-leaflet.js.org/) - React bindings
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility CSS framework

### Secondary (MEDIUM-HIGH confidence)
- [PostgreSQL vs MongoDB 2026](https://www.nucamp.co/blog/mongodb-vs-postgresql-in-2026-nosql-vs-sql-for-full-stack-apps) - Database comparison
- [Drizzle vs Prisma 2026](https://designrevision.com/blog/prisma-vs-drizzle) - ORM comparison
- [Leaflet vs Mapbox vs Google Maps](https://blog.logrocket.com/react-map-library-comparison/) - Map library comparison
- [Next.js Search Filtering](https://aurorascharff.no/posts/managing-advanced-search-param-filtering-next-app-router/) - Search params patterns
- [Neon Geospatial Guide](https://neon.com/guides/geospatial-search) - PostGIS implementation
- [Schema Markup 2026](https://almcorp.com/blog/schema-markup-detailed-guide-2026-serp-visibility/) - SEO structured data

### Tertiary (MEDIUM confidence - Domain pitfalls)
- [Google Maps Platform Best Practices](https://mapsplatform.google.com/resources/blog/google-maps-platform-best-practices-optimization-and-performance-tips/) - Map performance
- [Handling Large Datasets](https://reintech.io/blog/handling-large-datasets-google-maps-marker-clustering) - Clustering patterns
- [Duplicate Listings](https://hibu.com/blog/marketing-tips/how-to-fix-duplicate-listings-and-why-they-happen-in-the-first-place) - Deduplication
- [Geocoding Best Practices](https://developers.google.com/maps/documentation/geocoding/best-practices) - Address validation
- [Cold Start Problem](https://www.educative.io/newsletter/system-design/the-cold-start-problem) - Directory launch strategy
- [Search UX Best Practices](https://www.designrush.com/best-designs/websites/trends/search-ux-best-practices) - Search patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official documentation, well-established patterns
- Architecture: HIGH - Next.js App Router patterns are standard as of 2026
- Pitfalls: MEDIUM - Based on directory platform best practices, needs domain-specific validation
- Code examples: HIGH - Verified against official documentation

**Research date:** 2026-02-12
**Valid until:** 90 days (stable stack) - Re-validate if Next.js 16 or React 20 releases

**Phase-specific notes:**
- Phase 1 focuses on public browse/search/map experience only
- No submission form or admin features (Phase 2)
- No authentication needed (Phase 2)
- Content seeding happens in Phase 3 but must plan data model in Phase 1
- Mobile responsiveness, SEO, and accessibility are Phase 1 success criteria

**Critical dependencies:**
- PostGIS extension must be enabled on PostgreSQL database
- Marker clustering must be implemented from day one (not retrofitted)
- Full-text search indexes must be created in initial schema
- Geographic bounds must be configured for Louisville metro area

**Risk factors:**
- Empty directory launch (mitigate with Phase 3 content seeding)
- Map performance at scale (mitigate with clustering from day one)
- Geocoding accuracy (mitigate with validation API and manual verification)
- Search usability (mitigate with full-text search and typo tolerance)
