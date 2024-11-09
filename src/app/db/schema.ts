import { 
  pgTable, 
  text, 
  timestamp, 
  uuid, 
  varchar,
  boolean,
  json,
  integer
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkUser: varchar('clerk_user', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define users relations
export const usersRelations = relations(users, ({ many }) => ({
  snippets: many(snippets),
}));

// Snippets table
export const snippets = pgTable('snippets', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  code: text('code').notNull(),
  // Store tags as a JSON array for flexibility
  tags: json('tags').$type<string[]>().default([]).notNull(),
  authorId: uuid('author_id').references(() => users.id, { 
    onDelete: 'cascade' 
  }).notNull(),
  isPublished: boolean('is_published').default(false).notNull(),
  views: integer('views').default(0).notNull(),
  likes: integer('likes').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define snippets relations
export const snippetsRelations = relations(snippets, ({ one }) => ({
  author: one(users, {
    fields: [snippets.authorId],
    references: [users.id],
  }),
}));

// Comments table (for future expansion)
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  authorId: uuid('author_id').references(() => users.id, { 
    onDelete: 'cascade' 
  }).notNull(),
  snippetId: uuid('snippet_id').references(() => snippets.id, { 
    onDelete: 'cascade' 
  }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Define comments relations
export const commentsRelations = relations(comments, ({ one }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  snippet: one(snippets, {
    fields: [comments.snippetId],
    references: [snippets.id],
  }),
}));

// For type inference
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Snippet = typeof snippets.$inferSelect;
export type NewSnippet = typeof snippets.$inferInsert;
export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;