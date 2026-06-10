ALTER TABLE "users" ADD COLUMN "share_hash" varchar;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_share_hash_unique" UNIQUE("share_hash");