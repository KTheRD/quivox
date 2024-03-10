import { getRequestConfig } from "next-intl/server";
import { locales } from "@/navigation";
import { notFound } from "next/navigation";
import defaultMessages from "../messages/en.json";
import deepmerge from "deepmerge";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return { messages };
});
