import {
  serial,
  text,
  timestamp,
  pgTable,
  jsonb,
  date,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const repo = pgTable("repo", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  date: date("date", { mode: "date" }),
  name: text("name"),
  dependencies: jsonb("dependencies").$type<string[]>(),
  owner: text("owner"),
});

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  repos: jsonb("repos"),
  clerkUser: text("clerk_user"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const technology = pgTable("technology", {
  id: serial("id").primaryKey(),
  name: text("name"),
  dependencies: jsonb("dependencies").$type<string[]>(),
});

export const selectRepoSchema = createSelectSchema(repo);

export const customRepoSchema = selectRepoSchema.extend({
  dependencies: z.array(z.string()),
});
