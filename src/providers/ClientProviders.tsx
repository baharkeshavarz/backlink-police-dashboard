"use client";

import { FC, PropsWithChildren } from "react";
import {
  ThemeOptions,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import TanstackProvider from "./TanstackProvider";
import ToastProvider from "./ToastProvider";
import AppProvider from "./AppProvider";
import RTLProvider from "./RTLProvider";
import CustomLocalizationProvider from "./CustomLocalizationProvider";
import ConfirmAlertProvider from "./ConfirmAlertProvider";
import AppSessionProvider from "./AppSessionProvider";

export interface ClientProvidersProps {
  theme: ThemeOptions;
  locale: string;
  userAgent: any;
  session: any;
  globalStyles: any;
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
      <TanstackProvider>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider />
            <AppProvider userAgent={userAgent}>
              <CssBaseline />
              <GlobalStyles styles={globalStyles} />
              <RTLProvider locale={locale as any}>
                <CustomLocalizationProvider locale={locale as any}>
                  <ConfirmAlertProvider>{children}</ConfirmAlertProvider>
                </CustomLocalizationProvider>
              </RTLProvider>
            </AppProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </TanstackProvider>
    </AppSessionProvider>
  );
};

export default ClientProviders;
