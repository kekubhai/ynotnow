import { pgTable, text, timestamp, uuid, varchar, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  image: varchar('image', { length: 255 }),
  bio: text('bio'),
  role: varchar('role', { length: 50 }).default('user').notNull(),
  socialLinks: jsonb('social_links').$type<{
    twitter?: string;
    linkedin?: string;
    github?: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Ideas table
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
  tags: jsonb('tags').$type<string[]>().default([]),
  aiAnalysis: jsonb('ai_analysis').$type<{
    marketPotential?: number;
    competition?: string;
    risks?: string[];
    recommendations?: string[];
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Comments table
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  ideaId: uuid('idea_id').references(() => ideas.id).notNull(),
  parentId: uuid('parent_id').references(() => comments.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Upvotes table
export const upvotes = pgTable('upvotes', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  ideaId: uuid('idea_id').references(() => ideas.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Followers table
export const followers = pgTable('followers', {
  id: uuid('id').primaryKey().defaultRandom(),
  followerId: uuid('follower_id').references(() => users.id).notNull(),
  followingId: uuid('following_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  relatedId: uuid('related_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Export all tables
export * from './schema'; 