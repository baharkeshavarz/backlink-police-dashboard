import { defineRouting } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = ["en", "ar"] as const;

export const routing = defineRouting({
  locales,
  localePrefix: "as-needed",
  defaultLocale,
  pathnames: {
    "/": "/",
    "/pathnames": {
      ar: "/pfadnamen",
    },
  },
});
