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
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <TopBar />

      <Box sx={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
          }}
        >
          <Box
            flex={1}
            sx={{
              overflowY: "auto",
              bgcolor: "white",
              minHeight: 400,
            }}
          >
            {children}
          </Box>
          <Box
            component="footer"
            sx={{
              flexShrink: 0,
              height: FOOTER_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              px: 4,
              bgcolor: "white",
              borderTop: "1px solid",
              borderColor: "grey.200",
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
