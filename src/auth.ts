import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { fetchIDAndPasswordHash } from "./db/fetchData";
import { compare } from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string() })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const passwordHashAndID = await fetchIDAndPasswordHash(email);
        if (!passwordHashAndID) return null;

        if (!(await compare(password, passwordHashAndID.passwordHash))) {
          return null;
        }

        return {
          id: passwordHashAndID.id.toString(),
        };
      },
    }),
  ],
});
