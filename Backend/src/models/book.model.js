import { pgTable, uuid, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.model.js";

export const books = pgTable("books", {
  id: uuid("id").defaultRandom().primaryKey(),
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  coverImage: text("cover_image"),
  bannerImage: text("banner_image"),
  status: varchar("status", { length: 50 }).default("ongoing").notNull(),
  genre: varchar("genre", { length: 100 }),
  tags: text("tags").array(),
  totalChapters: integer("total_chapters").default(0).notNull(),
  views: integer("views").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
