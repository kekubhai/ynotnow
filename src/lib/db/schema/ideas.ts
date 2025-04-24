import { pgTable, text, timestamp, uuid, varchar, integer, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';

export const ideas = pgTable('ideas', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  problem: text('problem').notNull(),
  solution: text('solution').notNull(),
  targetMarket: text('target_market').notNull(),
  businessModel: text('business_model'),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  isPublic: boolean('is_public').default(false).notNull(),
  upvotes: integer('upvotes').default(0).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 