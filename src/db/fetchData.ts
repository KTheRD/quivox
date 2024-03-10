"use server"
import { eq } from "drizzle-orm";
import { db } from "./db";
import { user } from "./schema";
import { unstable_noStore } from "next/cache";

/** @throws Will throw an error on faulure to fetch data from the database*/
export async function fetchIDAndPasswordHash(email: string) {
  unstable_noStore()

  try {
    const result = await db
      .select({ id: user.id, passwordHash: user.passwordHash })
      .from(user)
      .where(eq(user.email, email));
    if (result.length === 0) return null;
    return result[0];
  } catch (e) {
    console.log("Failed to fetch ID and password hash:", e);
    throw e
  }
}
