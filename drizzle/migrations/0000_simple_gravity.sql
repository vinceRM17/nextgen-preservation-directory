CREATE TYPE "public"."category" AS ENUM('Builder', 'Craftsperson', 'Tradesperson', 'Developer', 'Investor', 'Advocate', 'Architect', 'Government', 'Nonprofit', 'Educator');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('draft', 'pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"role" "category" NOT NULL,
	"specialties" text[],
	"address" varchar(500),
	"phone" varchar(20),
	"email" varchar(255),
	"website" varchar(500),
	"image_url" varchar(500),
	"location" geometry(Point, 4326),
	"projects" jsonb,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"search_vector" "tsvector"
);
--> statement-breakpoint
CREATE INDEX "location_idx" ON "listings" USING gist ("location");--> statement-breakpoint
CREATE INDEX "search_vector_idx" ON "listings" USING gin ("search_vector");--> statement-breakpoint
CREATE INDEX "role_idx" ON "listings" USING btree ("role");