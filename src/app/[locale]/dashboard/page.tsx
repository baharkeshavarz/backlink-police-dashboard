"use client";

import { Box, Stack } from "@mui/material";
import Sidebar from "./components/sidebar/Sidebar";
import TopBar from "./components/TopBar";

const DashboardPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <TopBar />
      <Box display="flex" alignItems="flex-start" sx={{ pt: "60px" }}>
        <Sidebar />
        <Box
          width="100%"
          flex={1}
          display="flex"
          flexDirection="column"
          bgcolor="red"
        >
          test
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
