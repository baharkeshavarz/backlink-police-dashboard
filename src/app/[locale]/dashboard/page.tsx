"use client";

import { Box, Typography } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import TopBar from "./components/TopBar";
import { FOOTER_HEIGHT } from "@/constants/general";
import { useTranslations } from "next-intl";

const DashboardPage = () => {
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
          <Box flex={1} minHeight={500} sx={{ pb: `${FOOTER_HEIGHT}px` }}>
            {/* Page content goes here */}
          </Box>

          {/* Footer */}
          <Box
            width="100%"
            position="sticky"
            bottom={0}
            left={0}
            right={0}
            height={FOOTER_HEIGHT}
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

export default DashboardPage;
