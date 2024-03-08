import { serial, text, pgTable, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).unique().notNull(),
  email: text("email").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  role: text("role").$type<"admin" | "customer">().notNull(),
});
