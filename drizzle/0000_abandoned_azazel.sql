CREATE TABLE "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notes" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "notes" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.user_id() = "notes"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "notes" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.user_id() = "notes"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "notes" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.user_id() = "notes"."user_id")) WITH CHECK ((select auth.user_id() = "notes"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "notes" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.user_id() = "notes"."user_id"));