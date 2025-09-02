"use client";

import { FC, PropsWithChildren } from "react";
import {
  ThemeOptions,
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from "@mui/material";
import type { GlobalStylesProps } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import TanstackProvider from "./TanstackProvider";
import RTLProvider from "./RTLProvider";
import CustomLocalizationProvider from "./CustomLocalizationProvider";
import ConfirmAlertProvider from "./ConfirmAlertProvider";
import AppSessionProvider from "./AppSessionProvider";
import type { Locale } from "@/navigation";
import { Session } from "next-auth";
import type { userAgent } from "next/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import AppProvider from "./AppProvider";
import ToasterProvider from "./ToastProvider";

export interface ClientProvidersProps {
  theme: ThemeOptions;
  locale: Locale;
  userAgent: ReturnType<typeof userAgent>;
  session: Session | null;
  globalStyles: GlobalStylesProps["styles"];
}

const ClientProviders: FC<PropsWithChildren<ClientProvidersProps>> = ({
  children,
  theme,
  locale,
  userAgent,
  session,
  globalStyles,
}) => {
  return (
    <AppSessionProvider session={session}>
      <NuqsAdapter>
        <TanstackProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <ToasterProvider richColors position="top-right" />
              <AppProvider userAgent={userAgent}>
                <CssBaseline />
                <GlobalStyles styles={globalStyles} />
                <RTLProvider locale={locale}>
                  <CustomLocalizationProvider locale={locale}>
                    <ConfirmAlertProvider>{children}</ConfirmAlertProvider>
                  </CustomLocalizationProvider>
                </RTLProvider>
              </AppProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TanstackProvider>
      </NuqsAdapter>
    </AppSessionProvider>
  );
};

export default ClientProviders;
