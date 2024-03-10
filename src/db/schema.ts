import { serial, text, pgTable, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  email: text("email").unique().notNull(),
  passwordHash: varchar("password_hash", { length: 72 }).notNull(),
});
