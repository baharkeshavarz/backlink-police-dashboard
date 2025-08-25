import { languages, Locale } from "@/navigation";
import {
  AppProvider,
  ConfirmAlertProvider,
  TanstackProvider,
  I18nProvider,
  ToastProvider,
  RTLProvider,
  CustomLocalizationProvider,
} from "@/providers";
import { defaultTheme, globalStyles, persianTheme } from "@/config/theme";
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  GlobalStyles,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { PropsWithChildren, ReactNode } from "react";
import "../../../global.css";

type LocaleLayoutParams = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
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

  return (
    <html lang={locale} dir={languages?.[locale]?.direction}>
      <body>
        <TanstackProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={themes[locale] ?? defaultTheme}>
              <ToastProvider />
              <AppProvider userAgent={reqUserAgent}>
                <CssBaseline />
                <GlobalStyles styles={globalStyles} />
                <RTLProvider locale={locale}>
                  <CustomLocalizationProvider locale={locale}>
                    <I18nProvider locale={locale}>
                      <ConfirmAlertProvider>{children}</ConfirmAlertProvider>
                    </I18nProvider>
                  </CustomLocalizationProvider>
                </RTLProvider>
              </AppProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
