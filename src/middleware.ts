import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { locales } from "./i18n";

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

export default NextAuth(authConfig).auth((req) => {
  const path = req.nextUrl.pathname.split("/").filter(Boolean);
  const isInside = !(
    path.length === 0 ||
    (locales.includes(path[0] as (typeof locales)[number]) && path.length === 1)
  );

  if (isInside) {
    if (req.auth) {
      return intlMiddleware(req);
    }
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  if (req.auth) {
    return NextResponse.redirect(new URL("/home", req.nextUrl))
  }

  return intlMiddleware(req)
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
