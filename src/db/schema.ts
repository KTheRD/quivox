import { serial, text, pgTable, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  email: varchar("email", {length: 320}).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 72 }).notNull(),
  imageURL: text("image_url").unique()
});
