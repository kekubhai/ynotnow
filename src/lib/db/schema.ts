import { InferSelectModel, sql } from 'drizzle-orm';
import { timestamp, pgTable, serial, text, bigint, boolean,pgPolicy } from "drizzle-orm/pg-core";
import { authenticatedRole, authUid, crudPolicy,  } from 'drizzle-orm/neon';

export const notes = pgTable(
  'notes',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(), 
    title: text('title').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  },
  // Create RLS policy for the table
  (table) => [
    crudPolicy({
      role: authenticatedRole,
      read: authUid(table.userId),
      modify: authUid(table.userId),
    }),
  ]
);


export const todos = pgTable(
  'todos',
  {
    id: bigint('id', { mode: 'bigint' })
      .primaryKey()
      .generatedByDefaultAsIdentity(),
    userId: text('user_id')
      .notNull()
      .default(sql`(auth.user_id())`),
    task: text('task').notNull(),
    isComplete: boolean('is_complete').notNull().default(false),
    insertedAt: timestamp('inserted_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  () => ({
    p1: pgPolicy("create todos", {
      for: "insert",
      to: "authenticated",
      withCheck: sql`(select auth.user_id() = user_id)`,
    }),

    p2: pgPolicy("view todos", {
      for: "select",
      to: "authenticated",
      using: sql`(select auth.user_id() = user_id)`,
    }),

    p3: pgPolicy("update todos", {
      for: "update",
      to: "authenticated",
      using: sql`(select auth.user_id() = user_id)`,
    }),

    p4: pgPolicy("delete todos", {
      for: "delete",
      to: "authenticated",
      using: sql`(select auth.user_id() = user_id)`,
    }),
  }),
);

export type Todo = InferSelectModel<typeof todos>;
export type Note = InferSelectModel<typeof notes>;