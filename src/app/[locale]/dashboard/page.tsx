"use client";

import { PropsWithChildren } from "react";
import { Box, Typography } from "@mui/material";
import { FOOTER_HEIGHT } from "@/constants/general";

import { useTranslations } from "next-intl";
import TopBar from "./components/TopBar";
import Sidebar from "./components/sidebar/Sidebar";

const PageContainer = ({ children }: PropsWithChildren) => {
  const t = useTranslations();
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        bgcolor: "white",
      }}
    >
      <TopBar />
      <Box display="flex" flex={1}>
        <Sidebar />
        <Box flex={1} display="flex" flexDirection="column" position="relative">
          <Box flex={1} bgcolor="white" minHeight={500} pt={8}>
            {children}
          </Box>
          <Box
            width="100%"
            position="sticky"
            bottom={0}
            left={0}
            right={0}
            height={FOOTER_HEIGHT}
            bgcolor="white"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: 4,
            }}
          >
            <Typography variant="subtitle2" color="grey.500">
              {t("pages.dashboard.layout.footer")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageContainer;
