import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/"
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ token, user }) {
      if (!user) return token
      token.id = user.id
      token.name = user.name
      token.email = user.email
      token.image = user.image
      return token
    }
  },
  providers: [],
} satisfies NextAuthConfig;
