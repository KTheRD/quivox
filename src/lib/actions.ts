"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(_: string | undefined, formData: FormData){
  try {
    await signIn("credentials", formData);
  } catch(error) {
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
