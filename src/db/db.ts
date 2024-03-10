import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { user } from "./schema";

export const db = drizzle(sql);
