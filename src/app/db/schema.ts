import { serial, text, timestamp, pgTable, jsonb } from "drizzle-orm/pg-core";
export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  repos: jsonb("repos"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
