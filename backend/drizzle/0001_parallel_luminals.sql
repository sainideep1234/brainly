ALTER TABLE "content_tags" DROP CONSTRAINT "content_tags_content_id_content_content_id_fk";
--> statement-breakpoint
ALTER TABLE "content_tags" DROP CONSTRAINT "content_tags_tag_id_tags_tag_id_fk";
--> statement-breakpoint
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_content_id_content_content_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("content_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_tag_id_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE cascade ON UPDATE no action;