const { config } = require("dotenv");
const { sql } = require("@vercel/postgres");
const { drizzle } = require("drizzle-orm/vercel-postgres");
const { migrate } = require("drizzle-orm/vercel-postgres/migrator");

config();

const db = drizzle(sql);

(async () => {
  await migrate(db, { migrationsFolder: "drizzle" });

  await sql.end();
})();
