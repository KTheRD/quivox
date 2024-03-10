"use server";
import { signIn } from "@/auth";
import { createUser, doesEmailExist, doesNameExist } from "@/db/fetchData";
import { hash } from "bcrypt";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Wrong email or password";
        default:
          return "Something went wrong";
      }
    }
  }
}

export async function register(_: string | undefined, formData: FormData) {
  const parsedData = z
    .object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(8),
      repeatPassword: z.string(),
    })
    .refine(
      (data) =>
        data.password === data.repeatPassword &&
        /[a-z]/.test(data.password) &&
        /[A-Z]/.test(data.password) &&
        /\d/.test(data.password),
    )
    .safeParse(formData);

  if (!parsedData.success) return "Bad data";
  const { email, name, password } = parsedData.data;

  const isEmailTaken = await doesEmailExist(email);
  if (typeof isEmailTaken === "string") return "Something went wrong";
  if (isEmailTaken) return "Email already registered";

  const isNameTaken = await doesNameExist(name);
  if (typeof isNameTaken === "string") return "Something went wrong";
  if (isNameTaken) return "Email already registered";

  const result = await createUser({
    email,
    name,
    passwordHash: await hash(password, 10),
  });

  if (result) return "Something went wrong";

  await signIn("credentials", { email, password });
}
