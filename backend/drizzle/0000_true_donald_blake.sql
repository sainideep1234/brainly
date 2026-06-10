CREATE TYPE "public"."types" AS ENUM('youtube', 'tweet', 'document');--> statement-breakpoint
CREATE TABLE "content" (
	"content_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "content_content_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"titles" varchar NOT NULL,
	"descriptions" varchar,
	"links" varchar,
	"types" "types",
	"user_id" varchar(191) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_tags" (
	"content_tag_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "content_tags_content_tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"content_id" integer,
	"tag_id" integer
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"tag_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tags_tag_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"tag_names" varchar NOT NULL,
	CONSTRAINT "tags_tag_names_unique" UNIQUE("tag_names")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"names" varchar NOT NULL,
	"emails" varchar NOT NULL,
	"passwords" varchar NOT NULL,
	CONSTRAINT "users_emails_unique" UNIQUE("emails")
);
--> statement-breakpoint
ALTER TABLE "content" ADD CONSTRAINT "content_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_content_id_content_content_id_fk" FOREIGN KEY ("content_id") REFERENCES "public"."content"("content_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_tags" ADD CONSTRAINT "content_tags_tag_id_tags_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("tag_id") ON DELETE no action ON UPDATE no action;