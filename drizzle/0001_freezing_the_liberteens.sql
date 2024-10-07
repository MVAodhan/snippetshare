CREATE TABLE IF NOT EXISTS "repo" (
	"id" serial NOT NULL,
	"user_id" text,
	"date" date,
	"name" text,
	"dependencies" jsonb,
	"owner" text
);
