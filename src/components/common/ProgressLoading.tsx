"use client";

import { Box, LinearProgress } from "@mui/material";

const ProgressLoading = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="indeterminate" />
    </Box>
  );
};

export default ProgressLoading;
