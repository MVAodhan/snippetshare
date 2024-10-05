CREATE TABLE IF NOT EXISTS "user" (
	"id" serial NOT NULL,
	"name" text,
	"repos" jsonb,
	"created_at" timestamp,
	"updated_at" timestamp
);
