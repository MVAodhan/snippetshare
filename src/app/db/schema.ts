import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  json,
  integer,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Snippets table
export const snippets = pgTable("snippets", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  code: text("code").notNull(),
  tags: json("tags").$type<string[]>().default([]).notNull(),
  authorId: varchar("author_id")
    .references(() => users.clerkId, {
      onDelete: "cascade",
    })
    .notNull(),
  isPublished: boolean("is_published").default(false).notNull(),
  views: integer("views").default(0).notNull(),
  likes: integer("likes").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Comments table
export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  content: text("content").notNull(),
  authorId: uuid("author_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  snippetId: uuid("snippet_id")
    .references(() => snippets.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// New favorites table
export const favorites = pgTable(
  "favorites",
  {
    userId: varchar("user_id")
      .references(() => users.clerkId, {
        onDelete: "cascade",
      })
      .notNull(),
    snippetId: uuid("snippet_id")
      .references(() => snippets.id, {
        onDelete: "cascade",
      })
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.snippetId] }),
    };
  }
);

// Define users relations
export const usersRelations = relations(users, ({ many }) => ({
  snippets: many(snippets),
  comments: many(comments, { relationName: "userComments" }),
  favorites: many(favorites),
}));

// Define snippets relations
export const snippetsRelations = relations(snippets, ({ one, many }) => ({
  author: one(users, {
    fields: [snippets.authorId],
    references: [users.clerkId],
  }),
  comments: many(comments),
  favoritedBy: many(favorites),
}));

// Define comments relations
export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
    relationName: "userComments",
  }),
  snippet: one(snippets, {
    fields: [comments.snippetId],
    references: [snippets.id],
  }),
}));

// Define favorites relations
export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.clerkId],
  }),
  snippet: one(snippets, {
    fields: [favorites.snippetId],
    references: [snippets.id],
  }),
}));

// Type inference
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Snippet = typeof snippets.$inferSelect;
export type NewSnippet = typeof snippets.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferInsert;
