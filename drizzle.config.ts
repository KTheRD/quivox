import type { Config } from "drizzle-kit";

console.log(process.env.POSTGRES_URL);
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: { connectionString: process.env.POSTGRES_URL! },
} satisfies Config;
