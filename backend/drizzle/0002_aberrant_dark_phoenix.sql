ALTER TABLE "users" RENAME COLUMN "user_id" TO "id";--> statement-breakpoint
ALTER TABLE "content" DROP CONSTRAINT "content_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;