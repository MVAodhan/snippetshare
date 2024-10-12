import { pgTable, serial, text, date, jsonb } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const repo = pgTable("repo", {
	id: serial("id").primaryKey().notNull(),
	userId: text("user_id"),
	date: date("date"),
	name: text("name"),
	dependencies: jsonb("dependencies"),
	owner: text("owner"),
});