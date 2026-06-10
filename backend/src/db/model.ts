import { integer, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const typeEnum = pgEnum("types", ["youtube", "tweet", "document"]);

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID())
    .notNull(),
  name: varchar("names").notNull(),
  email: varchar("emails").notNull().unique(),
  password: varchar("passwords").notNull(),
});

export const contentTable = pgTable("content", {
  id: integer("content_id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("titles").notNull(),
  descriptions: varchar("descriptions"),
  links: varchar("links"),
  type: typeEnum("types"),
  userId: varchar("user_id", { length: 191 })
    .references(() => usersTable.id)
    .notNull(),
});

export const tagsTable = pgTable("tags", {
  id: integer("tag_id").primaryKey().generatedAlwaysAsIdentity(),
  tagName: varchar("tag_names").unique().notNull(),
});

export const contentTagsTable = pgTable("content_tags", {
  id: integer("content_tag_id").primaryKey().generatedAlwaysAsIdentity(),
  contentId: integer("content_id").references(() => contentTable.id, {
    onDelete: "cascade",
  }),
  tagsId: integer("tag_id").references(() => tagsTable.id, {
    onDelete: "cascade",
  }),
});

export const contentRelations = relations(contentTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [contentTable.userId], // "MY physical column (Foreign Key)"
    references: [usersTable.id], // "THEIR physical column (Primary Key)"
  }),

  tags: many(contentTagsTable),
}));

export const userRealtions = relations(usersTable, ({ many }) => ({
  posts: many(contentTable),
}));

export const tagsRealations = relations(tagsTable, ({ many }) => ({
  taggedContent: many(contentTagsTable),
}));

export const contentTagsRealations = relations(contentTagsTable, ({ one }) => ({
  content: one(contentTable, {
    fields: [contentTagsTable.contentId],
    references: [contentTable.id],
  }),
  tag: one(tagsTable, {
    fields: [contentTagsTable.tagsId],
    references: [tagsTable.id],
  }),
}));
