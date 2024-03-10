"use server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { user } from "./schema";
import { unstable_noStore } from "next/cache";

/** @throws Will throw an error on faulure to fetch data from the database*/
export async function fetchIDAndPasswordHash(email: string) {
  unstable_noStore();

  try {
    const result = await db
      .select({ id: user.id, passwordHash: user.passwordHash })
      .from(user)
      .where(eq(user.email, email));
    if (result.length === 0) return null;
    return result[0];
  } catch (e) {
    console.log("Failed to fetch ID and password hash:", e);
    throw e;
  }
}

export async function doesEmailExist(email: string) {
  try {
    const result = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.email, email));

    return !!result.length;
  } catch (e) {
    console.log("Failed to check if email exists:", e);
    return "Something went wrong";
  }
}

export async function doesNameExist(name: string) {
  try {
    const result = await db
      .select({ id: user.id })
      .from(user)
      .where(eq(user.name, name));

    return !!result.length;
  } catch (e) {
    console.log("Failed to check if name exists:", e);
    return "Something went wrong";
  }
}

export async function createUser({
  email,
  name,
  passwordHash,
}: {
  email: string;
  name: string;
  passwordHash: string;
}) {
  unstable_noStore();

  try {
    const result = await db
      .insert(user)
      .values({ email, name, passwordHash })
      .onConflictDoNothing()
      .returning({ id: user.id });

    if (result.length === 0) return "Something went wrong";

    console.log(`User ${name} with id ${result[0].id} registered successfully`);
    return null;
  } catch (e) {
    console.log("Failed to create user:", e);
    return "Something went wrong";
  }
}

export async function fetchUserData(id: number) {
  unstable_noStore();

  try {
    const result = await db
      .select({ name: user.name, email: user.email, imageURL: user.imageURL })
      .from(user)
      .where(eq(user.id, id));
    if (result.length) return result[0];
    return null;
  } catch (e) {
    console.log("Failed to fetch user data:", e);
    return "Something went wrong";
  }
}
