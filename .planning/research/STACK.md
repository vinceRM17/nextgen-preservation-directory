# Technology Stack

**Project:** NextGen Preservation Collab Directory
**Researched:** 2026-02-12
**Confidence:** HIGH

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (stable) or 16.x | Full-stack React framework | Industry standard for directory apps in 2026. App Router provides server-first architecture ideal for public directories. Built-in features: file-based routing, server components, API routes, image optimization. [Next.js 15 is production-ready](https://nextjs.org/blog/next-15); Next.js 16 adds Turbopack caching. |
| React | 19.x | UI library | Required by Next.js 15+. Modern concurrent features. Server/Client component split ideal for directory with public listings. |
| TypeScript | 5.x | Type safety | De facto standard for production Next.js in 2026. Essential for form validation schemas and database typing. |
| Node.js | 20.x LTS or 22.x | Runtime | Next.js requires Node 18.17+. Use LTS for stability or 22.x for latest features. |

**Confidence:** HIGH — Source: [Next.js official docs](https://nextjs.org/docs), [Next.js release notes](https://nextjs.org/blog/next-15)

### Database
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| PostgreSQL | 15.x or 16.x | Primary database | Relational structure perfect for directory listings (structured stakeholder data). ACID compliance for admin approval workflows. PostGIS extension for geospatial queries. [PostgreSQL is the safer default for 2026](https://www.tigerdata.com/blog/its-2026-just-use-postgres) with 55.6% developer adoption. |
| PostGIS | 3.x | Geospatial extension | Essential for location-based search and interactive map features. Provides spatial indexing (GiST), distance calculations, bounding box queries. Open-source, battle-tested for directory apps. |
| Drizzle ORM | Latest | Database ORM | Code-first TypeScript ORM. Zero runtime overhead, tiny bundle (edge-ready). SQL-like API with full type safety. Better for serverless than Prisma due to smaller footprint. [Recommended for new Next.js projects in 2026](https://designrevision.com/blog/prisma-vs-drizzle). |

**Confidence:** HIGH — Sources: [PostgreSQL comparison](https://www.nucamp.co/blog/mongodb-vs-postgresql-in-2026-nosql-vs-sql-for-full-stack-apps), [PostGIS docs](https://postgis.net/), [Drizzle vs Prisma 2026](https://makerkit.dev/blog/tutorials/drizzle-vs-prisma)

**Alternative Database:** Prisma 6.x if team prefers schema-first approach and wants Prisma Studio GUI. Has larger footprint but gentler learning curve.

### Map Integration
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Leaflet | 1.9.x | Interactive map library | Open-source, zero cost, lightweight (42KB gzipped). No usage limits or API keys for basic maps. Perfect for community directory budget. Mobile-friendly, extensive plugin ecosystem. |
| React Leaflet | 4.x | React wrapper for Leaflet | Official React bindings for Leaflet. Declarative API fits React patterns. Active maintenance. |
| OpenStreetMap | — | Map tile provider | Free tile provider for Leaflet. Community-driven, no billing surprises. Good coverage for Louisville, KY. |

**Confidence:** HIGH — Sources: [Leaflet comparison 2026](https://blog.logrocket.com/react-map-library-comparison/), [Mapping libraries comparison](https://retool.com/blog/react-map-library)

**Alternative Maps:**
- **Mapbox GL JS**: If you need advanced styling/vector tiles. Free tier: 50K map loads/month. Better performance but introduces vendor dependency.
- **Google Maps**: Avoid unless specific feature required. Limited free tier, expensive at scale.

### UI & Styling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x | Utility-first CSS | Industry standard for modern Next.js apps. Fast development, consistent design system, excellent mobile-first approach. Tailwind v4 stable as of 2026 with OKLCH colors and @theme directive. |
| shadcn/ui | Latest | Component library | Copy-paste React components (not npm package). Built on Radix UI + Tailwind. Full ownership of code. Updated for Tailwind v4 and React 19 in 2026. Thousands of production-ready blocks available. |
| Radix UI | Latest | Unstyled primitives | Accessible component primitives (used by shadcn/ui). WCAG compliant, keyboard navigation, screen reader support. |

**Confidence:** HIGH — Sources: [shadcn/ui Tailwind v4 support](https://ui.shadcn.com/docs/tailwind-v4), [shadcn/ui overview](https://thecodebeast.com/shadcn-ui-the-component-library-that-finally-puts-developers-in-control/)

### Forms & Validation
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| React Hook Form | 7.x | Form state management | Performant (minimal re-renders), excellent DX, TypeScript support. Standard for complex forms in 2026. Includes form builder GUI. |
| Zod | 4.x (stable) | Schema validation | TypeScript-first runtime validation. Bridges compile-time types and runtime safety. Essential for user submissions. Auto-infers TS types from schemas. Perfect pairing with React Hook Form via @hookform/resolvers. |

**Confidence:** HIGH — Sources: [React Hook Form docs](https://react-hook-form.com/), [Zod validation guide 2026](https://oneuptime.com/blog/post/2026-01-25-zod-validation-typescript/view)

### Search & Filtering
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| nuqs | Latest | Search param state management | Type-safe URL search params for Next.js App Router. Clean approach to filter state without prop drilling. Supports server-side rendering. |
| use-debounce | Latest | Search input optimization | Debounce search queries (300ms standard). Prevents excessive re-renders and database queries. |
| PostgreSQL Full-Text Search | Built-in | Text search capabilities | Native Postgres feature. No external service needed. Good enough for directory search (names, specialties, descriptions). |

**Confidence:** MEDIUM — Sources: [Next.js search filtering](https://aurorascharff.no/posts/managing-advanced-search-param-filtering-next-app-router/), [Next.js search tutorial](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)

**Alternative Search:** Algolia or Typesense if full-text search becomes inadequate. Defer until needed (YAGNI).

### Authentication (Admin Only)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Clerk | Latest | Admin authentication | Modern auth solution for Next.js. Handles MFA, OAuth, sessions, RBAC. Pre-built UI components. Free tier: 50K monthly active users. Admin-only use case fits well within free tier. Seamless App Router integration. |

**Confidence:** HIGH — Sources: [Clerk Next.js docs](https://clerk.com/docs/nextjs/getting-started/quickstart), [Clerk authentication guide 2026](https://clerk.com/articles/complete-authentication-guide-for-nextjs-app-router)

**Alternative Auth:**
- **NextAuth.js (Auth.js v5)**: If you prefer self-hosted auth. More configuration required.
- **No auth initially**: Start without auth, add when admin dashboard needed.

### Image Handling
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js Image | Built-in | Image optimization | Built into Next.js. Automatic optimization, lazy loading, responsive images. No additional service needed for basic use. |
| Cloudinary | Free tier | Upload widget & CDN | If user-uploaded images needed. Free tier generous. Next Cloudinary package provides CldUploadButton component. Handles transformations, moderation, delivery. |

**Confidence:** MEDIUM — Sources: [Next.js Image docs](https://nextjs.org/docs/app/api-reference/components/image), [Cloudinary Next.js integration](https://cloudinary.com/blog/cloudinary-image-uploads-using-nextjs-app-router)

**Alternative Images:**
- **UploadThing**: Simpler than Cloudinary, built specifically for Next.js. Good for basic uploads.
- **Local storage + Next.js Image**: Start here if images are small and infrequent.

### Deployment & Infrastructure
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vercel | — | Hosting platform | Created by Next.js team. Zero-config deployment. Edge network, preview deployments, automatic HTTPS. Free tier suitable for community directory. |
| Neon or Supabase | — | Managed PostgreSQL | Serverless Postgres with generous free tier. PostGIS support. Auto-scaling. Neon focuses on Postgres; Supabase adds auth/storage if needed later. |
| GitHub | — | Git hosting + CI/CD | Vercel integrates with GitHub for automatic deployments. Preview deployments on PR. |

**Confidence:** HIGH — Sources: [Vercel Next.js docs](https://vercel.com/docs/frameworks/full-stack/nextjs), [Neon geospatial guide](https://neon.com/guides/geospatial-search), [Supabase PostGIS docs](https://supabase.com/docs/guides/database/extensions/postgis)

**Alternative Deployment:**
- **Self-hosted (Docker)**: If you need full control or have existing infrastructure.
- **Railway, Render, or Fly.io**: Good Vercel alternatives with PostgreSQL included.

### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Linting | Next.js includes ESLint config. Enforce code standards. |
| Prettier | Code formatting | Auto-format on save. Integrates with ESLint. |
| TypeScript Strict Mode | Type safety | Enable strict mode for maximum safety. |
| Drizzle Kit | Database migrations | CLI tool for schema migrations and introspection. |
| Drizzle Studio | Database GUI | Visual database explorer. Lightweight Prisma Studio alternative. |

**Confidence:** HIGH

### Testing (Optional for MVP)
| Technology | Purpose | When to Use |
|-----------|---------|-------------|
| Vitest | Unit testing | Test utilities, validation schemas, business logic. Faster than Jest for Vite/Next.js. |
| Playwright | E2E testing | Test critical flows: submission form, admin approval, map interaction. Multi-browser support. |
| React Testing Library | Component testing | Test UI components in isolation. User-focused assertions. |

**Confidence:** HIGH — Sources: [Next.js testing guide](https://nextjs.org/docs/app/guides/testing), [Vitest Next.js setup](https://nextjs.org/docs/app/guides/testing/vitest), [Testing strategy 2026](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies)

**Note:** Defer testing until post-MVP unless TDD preference. Focus on shipping first.

## Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | Latest | Conditional classNames | Combine Tailwind classes dynamically. Used by shadcn/ui. |
| tailwind-merge | Latest | Merge Tailwind classes | Prevent class conflicts. Pairs with clsx. |
| date-fns | Latest | Date formatting | Lightweight alternative to Moment.js. Display submission dates, last updated. |
| sharp | Latest | Image processing | Dependency for Next.js Image optimization. |
| @tanstack/react-query | 5.x | Server state management | Cache and sync server data. Optional but recommended for admin dashboard. |
| @hookform/resolvers | Latest | Form validation bridge | Connects React Hook Form to Zod schemas. |
| lucide-react | Latest | Icon library | Modern icon set. Tree-shakeable. Used by shadcn/ui. |

**Confidence:** HIGH

## Installation

```bash
# Initialize Next.js project
npx create-next-app@latest nextgen-preservation-directory --typescript --tailwind --app

# Core dependencies
npm install drizzle-orm postgres
npm install react-hook-form @hookform/resolvers zod
npm install leaflet react-leaflet
npm install @clerk/nextjs  # If using Clerk for admin auth
npm install nuqs use-debounce

# UI components (shadcn/ui - installed via CLI)
npx shadcn@latest init
npx shadcn@latest add button input form card

# Development dependencies
npm install -D drizzle-kit @types/leaflet
npm install -D vitest @vitejs/plugin-react  # If adding testing
npm install -D @playwright/test  # If adding E2E testing
npm install -D eslint prettier eslint-config-prettier
```

**Database setup:**
```bash
# Set up Neon or Supabase PostgreSQL instance
# Enable PostGIS extension in database dashboard

# Create drizzle.config.ts
# Run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Framework | Next.js 15+ | Remix, Astro | Next.js is the standard for directory apps. Largest ecosystem, best DX, Vercel deployment. Remix is excellent but smaller ecosystem. Astro better for content sites. |
| Database | PostgreSQL + PostGIS | MongoDB | Directory needs structured data (stakeholder fields), geospatial queries (PostGIS), and transactional integrity (approval workflows). MongoDB better for unstructured/rapidly changing schemas. |
| ORM | Drizzle | Prisma | Drizzle has lighter footprint (edge-ready), SQL-like queries, code-first approach. Prisma better if team wants schema-first and GUI tooling (Prisma Studio). Both excellent in 2026. |
| Maps | Leaflet | Mapbox, Google Maps | Leaflet is free and unlimited. Mapbox ($) better for custom vector styling. Google Maps ($$$) expensive and vendor lock-in. Start with Leaflet, migrate if needed. |
| UI | Tailwind + shadcn/ui | Material UI, Chakra | Tailwind is standard in 2026. shadcn/ui provides ownership (copy-paste) vs npm dependency. Material UI more opinionated. Chakra good but Tailwind more flexible. |
| Validation | Zod | Yup, Joi | Zod is TypeScript-first with type inference. Yup is older, less TS-native. Joi is Node-focused, not browser-friendly. |
| Auth | Clerk | NextAuth.js, Auth0 | Clerk has best Next.js DX, free tier suitable. NextAuth requires more setup. Auth0 expensive for simple admin use case. |
| Hosting | Vercel | Netlify, Railway | Vercel built by Next.js team, zero-config. Netlify comparable but less Next.js-specific. Railway good for full-stack but Vercel edge network better. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| MongoDB (for this use case) | Directory data is structured and relational. Stakeholders have defined fields (name, role, location). Admin approval needs transactions. PostGIS for geo queries. | PostgreSQL + PostGIS + Drizzle |
| Create React App | Deprecated. No SSR, no file-based routing, manual setup required. Not suitable for 2026 production apps. | Next.js 15+ with App Router |
| CSS Modules / Styled Components | Tailwind is the standard in 2026. Better DX, faster development, smaller bundle with Tailwind v4. | Tailwind CSS 4.x |
| Google Maps (initially) | Expensive at scale. Vendor lock-in. Requires API key management. Billing surprises. | Leaflet + OpenStreetMap (free, unlimited) |
| Jest (for new projects) | Slower than Vitest for Vite/ESM projects. Vitest has better Next.js integration in 2026. | Vitest + Playwright |
| Class components | React 19 is hooks-first. Functional components + hooks are standard. | Functional components with hooks |
| Pages Router | App Router is production-ready and the future of Next.js. Server components provide better performance. | App Router (Next.js 13+) |
| Client-side only rendering | Directory needs SEO for discoverability. App Router SSR/SSG provides better performance and indexing. | Next.js App Router with Server Components |

## Stack Patterns by Use Case

**If admin dashboard is MVP-critical:**
- Add Clerk auth immediately
- Add @tanstack/react-query for admin data fetching
- Consider Payload CMS or Sanity if you want CMS-style workflow UI

**If budget is absolutely zero:**
- Use Vercel free tier (suitable for community project)
- Use Neon or Supabase free tier (PostgreSQL)
- Use Leaflet + OpenStreetMap (no API costs)
- Use Clerk free tier (50K users - more than enough for admins)
- Self-host images initially (defer Cloudinary)

**If heavy geospatial queries expected:**
- Ensure PostGIS extension enabled
- Create GiST spatial indexes on location columns
- Consider Neon for auto-scaling Postgres

**If rapid prototyping needed:**
- Use shadcn/ui blocks for fast UI
- Use Clerk for instant auth
- Use Vercel for instant deployment
- Defer testing until post-MVP

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Next.js 15.x | React 18 or React 19 | React 19 recommended but 18 supported |
| Next.js 16.x | React 19.2+ | Requires React 19 Canary |
| shadcn/ui (2026) | Tailwind 4.x, React 19 | Fully updated for latest versions |
| React Leaflet 4.x | Leaflet 1.9.x, React 18/19 | Stable pairing |
| Drizzle ORM | PostgreSQL 12+ | PostGIS 3.x compatible |
| Clerk | Next.js 13+ App Router | Full App Router support |

## Sources

### Official Documentation (HIGH confidence)
- [Next.js Official Docs](https://nextjs.org/docs) — Framework documentation
- [Next.js 15 Release](https://nextjs.org/blog/next-15) — Version 15 features
- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — Version 16 migration
- [PostgreSQL Official](https://www.postgresql.org/) — Database documentation
- [PostGIS Documentation](https://postgis.net/) — Geospatial extension
- [Leaflet Documentation](https://leafletjs.com/) — Mapping library
- [Zod Documentation](https://zod.dev/) — Validation library
- [React Hook Form](https://react-hook-form.com/) — Form library
- [Clerk Docs](https://clerk.com/docs) — Authentication
- [shadcn/ui](https://ui.shadcn.com/) — Component library
- [Drizzle ORM](https://orm.drizzle.team/) — Database ORM

### Technical Comparisons (MEDIUM-HIGH confidence)
- [Next.js Best Practices 2026](https://www.serviots.com/blog/nextjs-development-best-practices) — Current patterns
- [PostgreSQL vs MongoDB 2026](https://www.nucamp.co/blog/mongodb-vs-postgresql-in-2026-nosql-vs-sql-for-full-stack-apps) — Database comparison
- [Drizzle vs Prisma 2026](https://designrevision.com/blog/prisma-vs-drizzle) — ORM comparison
- [Leaflet vs Mapbox vs Google Maps](https://blog.logrocket.com/react-map-library-comparison/) — Map library comparison
- [Testing Strategy 2026](https://www.nucamp.co/blog/testing-in-2026-jest-react-testing-library-and-full-stack-testing-strategies) — Modern testing approaches

### Guides & Tutorials (MEDIUM confidence)
- [Geospatial Search with Postgres](https://neon.com/guides/geospatial-search) — PostGIS implementation
- [Next.js Search and Filtering](https://aurorascharff.no/posts/managing-advanced-search-param-filtering-next-app-router/) — Search params patterns
- [Cloudinary Next.js Integration](https://cloudinary.com/blog/cloudinary-image-uploads-using-nextjs-app-router) — Image uploads

---
*Stack research for: NextGen Preservation Collab Directory*
*Researched: 2026-02-12*
*Next update: When major version releases occur (Next.js 17, React 20, etc.)*
