import { languages, Locale } from "@/navigation";
import { I18nProvider } from "@/providers";
import { defaultTheme, globalStyles, persianTheme } from "@/config/theme";
import { ThemeOptions } from "@mui/material";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { PropsWithChildren, ReactNode } from "react";
import "../../../global.css";
import ClientProviders from "@/providers/ClientProviders";
import { getServerSession } from "next-auth";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

type LocaleLayoutParams = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "BackLink Police Dashboard",
  description: ".",
};

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<LocaleLayoutParams>) {
  const headersList = await headers();
  const reqUserAgent = userAgent({ headers: headersList });

  const themes: Record<Locale, ThemeOptions> = {
    en: defaultTheme,
    ar: persianTheme,
  };
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const session = await getServerSession();

  return (
    <html lang={locale} dir={languages[typedLocale]?.direction}>
      <body className={inter.className}>
        <I18nProvider locale={typedLocale}>
          <ClientProviders
            theme={themes[typedLocale] ?? defaultTheme}
            locale={typedLocale}
            userAgent={reqUserAgent}
            session={session}
            globalStyles={globalStyles}
          >
            {children}
          </ClientProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
