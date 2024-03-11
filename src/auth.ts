import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { fetchUserData } from "./db/fetchData";
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

        const userData = await fetchUserData(email);
        if (!userData) return null;

        if (!(await compare(password, userData.passwordHash))) {
          return null;
        }

        return {
          id: userData.id.toString(),
          image: userData.image,
          name: userData.name,
          email: userData.email,
        };
      },
    }),
  ],
});
