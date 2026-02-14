# NextGen Preservation Collab Directory

A directory of Louisville's historic preservation community — builders, craftspeople, architects, and advocates — built with Next.js, PostgreSQL, and Leaflet.

**Live:** https://nextgen-preservation-directory.vercel.app

## Features

- **Browse & Search** — Filter listings by category (Builder, Craftsperson, Architect, etc.) and location
- **Interactive Map** — Leaflet-powered map with clustered markers and popups
- **Public Submissions** — Anyone can submit a listing with duplicate detection and geocoding
- **Admin Dashboard** — Clerk-authenticated admin panel for approving submissions and managing listings
- **SEO** — Dynamic sitemap, robots.txt, Open Graph tags, and JSON-LD schema markup

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) with PostGIS |
| ORM | Drizzle ORM |
| Auth | Clerk |
| Maps | Leaflet + React Leaflet + Mapbox (geocoding) |
| Styling | Tailwind CSS |
| Hosting | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
# Fill in: DATABASE_URL, Clerk keys, MAPBOX_ACCESS_TOKEN

# Push schema to database
npm run db:push

# Seed sample data
npm run db:seed

# Start dev server
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema to database |
| `npm run db:generate` | Generate migration files |
| `npm run db:migrate` | Run migrations |
| `npm run db:studio` | Open Drizzle Studio |
| `npm run db:seed` | Seed sample listings |

## Project Structure

```
src/
  app/
    (public)/          # Public routes (home, listings, map)
    admin/             # Auth-protected admin dashboard
    submit/            # Public submission form
    api/               # API routes (geo)
  components/
    admin/             # Admin tables and forms
    layout/            # Header, Footer, MainLayout
    listings/          # ListingCard, ListingDetail, ListingGrid
    map/               # MapView (Leaflet)
    search/            # SearchBar, FilterPanel
    ui/                # Reusable UI primitives
  lib/
    db/                # Schema, connection, seed data
    queries/           # Database queries (search, geo)
    geocoding/         # Mapbox geocoding
    validation/        # Zod schemas
    duplicate-detection/ # Similarity scoring for submissions
drizzle/
  migrations/          # SQL migration files
```

## Environment Variables

See `.env.example` for required variables:

- `DATABASE_URL` — Neon PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk public key
- `CLERK_SECRET_KEY` — Clerk secret key
- `MAPBOX_ACCESS_TOKEN` — Mapbox geocoding token
- `NEXT_PUBLIC_SITE_URL` — Production URL
