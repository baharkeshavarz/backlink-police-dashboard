"use client";

import { Box, Skeleton } from "@mui/material";

const StatCardItemSkeleton = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      p={4}
      borderRadius={2}
      bgcolor={"common.white"}
    >
      {/* Icon placeholder */}
      <Skeleton
        variant="circular"
        width={78}
        height={75}
        sx={{ borderRadius: "41%" }}
      />

      {/* Text placeholders */}
      <Box height={70} flex={1}>
        <Skeleton variant="text" width={120} height={24} sx={{ mb: 1 }} />
        <Box display="flex" gap={1.3} alignItems="center">
          <Skeleton variant="text" width={80} height={32} />
          <Skeleton variant="rectangular" width={60} height={24} />
        </Box>
      </Box>
    </Box>
  );
};

export default StatCardItemSkeleton;
