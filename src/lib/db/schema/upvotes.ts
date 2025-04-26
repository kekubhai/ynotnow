import { pgTable, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users';
import { ideas } from './ideas';

export const upvotes = pgTable('upvotes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  ideaId: uuid('idea_id').references(() => ideas.id).notNull(),
  value: integer('value').notNull(), // 1 for upvote, -1 for downvote
  createdAt: timestamp('created_at').defaultNow().notNull(),
});