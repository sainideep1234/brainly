import { integer, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const typeEnum = pgEnum("types", ["youtube", "tweet", "document"]);

export const usersTable = pgTable("users", {
  id: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("names").notNull(),
  email: varchar("emails").notNull().unique(),
});

export const contentTable = pgTable("content", {
  id: integer("content_id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("titles").notNull(),
  descriptions: varchar("descriptions"),
  links: varchar("links"),
  type: typeEnum("types"),
  userId:integer("user_id")
});

export const tagsTable = pgTable("tags", {
  id: integer("tag_id").primaryKey().generatedAlwaysAsIdentity(),
  tagName: varchar("tag_names").unique().notNull(),
});

export const contentTags = pgTable("content_tags" , {
  id: integer("content_tag_id").primaryKey().generatedAlwaysAsIdentity(),
  contentId:integer("content_id"),
  tagsId:integer("tag_id"),
})


// one to many reltionship between user and content
export const usersRelations = relations(usersTable, ({ many }) => ({
  content: many(contentTable),
}));

export const contentRelations = relations(contentTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [contentTable.id],
    references: [usersTable.id],
  }),
}));

