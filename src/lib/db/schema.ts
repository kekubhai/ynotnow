import { timestamp, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";
// Replace with actual import
import { authenticatedRole, authUid, crudPolicy } from 'drizzle-orm/neon';
export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(), // Add this missing field
  title: text('title').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
});

// Define policies separately 
export const notesPolicy = crudPolicy(notes, {
  role: 'authenticatedRole',
  read: authUid(notes.userId)
});

// Create Zod schema for validation
export type Todo = InferSelectModel<typeof notes>;