import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import defaultMessages from "../messages/en.json";
import deepmerge from "deepmerge";

export const locales = ["en", "ru"] as const;
export const localeNames = {
  en: "English",
  ru: "Русский",
} satisfies Record<(typeof locales)[number], string>;
export const localeCountryCodes = {
  en: "US",
  ru: "RU",
} satisfies Record<(typeof locales)[number], string>;

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as (typeof locales)[number])) notFound();

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return { messages };
});
