-- Migration: Add trigram (pg_trgm) indexes for duplicate detection
-- Created: 2026-02-12
-- Depends on: 0001_enable_trgm_extension.sql (pg_trgm extension)

-- Trigram indexes on listings table for fuzzy matching
CREATE INDEX IF NOT EXISTS "listings_name_trgm_idx" ON "listings" USING GIN ("name" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "listings_description_trgm_idx" ON "listings" USING GIN (COALESCE("description", '') gin_trgm_ops);

-- Trigram indexes on submissions table for duplicate detection
CREATE INDEX IF NOT EXISTS "submissions_name_trgm_idx" ON "submissions" USING GIN ("name" gin_trgm_ops);
CREATE INDEX IF NOT EXISTS "submissions_organization_trgm_idx" ON "submissions" USING GIN (COALESCE("organization", '') gin_trgm_ops);
