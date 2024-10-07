import {
  serial,
  text,
  timestamp,
  pgTable,
  jsonb,
  date,
} from "drizzle-orm/pg-core";
export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  repos: jsonb("repos"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const repo = pgTable("repo", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  date: date("date", { mode: "date" }),
  name: text("name"),
  dependencies: jsonb("dependencies").$type<string[]>(),
  owner: text("owner"),
});
