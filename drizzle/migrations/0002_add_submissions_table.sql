-- Migration: Add submissions table for public form submissions
-- Created: 2026-02-12
-- Depends on: 0000_simple_gravity.sql (status and category enums)

CREATE TABLE IF NOT EXISTS "submissions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  -- Submitter info
  "name" varchar(255) NOT NULL,
  "organization" varchar(255),
  "email" varchar(255) NOT NULL,
  "phone" varchar(20),
  -- Professional details
  "role" "category" NOT NULL,
  "specialties" text[],
  "website" varchar(500),
  "description" text,
  -- Location
  "address" varchar(500) NOT NULL,
  "formatted_address" varchar(500),
  "location" geometry(Point, 4326),
  -- Moderation
  "status" "status" DEFAULT 'pending' NOT NULL,
  "admin_notes" text,
  "reviewed_at" timestamp,
  "reviewed_by" varchar(255),
  -- Duplicate detection
  "duplicate_of" uuid,
  "similarity_score" varchar(10),
  -- Timestamps
  "submitted_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS "submissions_status_idx" ON "submissions" ("status");
CREATE INDEX IF NOT EXISTS "submissions_submitted_at_idx" ON "submissions" ("submitted_at");
