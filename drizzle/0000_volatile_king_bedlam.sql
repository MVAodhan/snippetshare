CREATE TABLE IF NOT EXISTS "repo" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"date" date,
	"name" text,
	"dependencies" jsonb,
	"owner" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "technology" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"dependencies" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"repos" jsonb,
	"clerk_user" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
