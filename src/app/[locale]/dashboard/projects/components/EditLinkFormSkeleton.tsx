"use client";

import { Box, Grid, Skeleton } from "@mui/material";

const EditLinkFormSkeleton = () => {
  return (
    <Box>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12 }}>
          <Skeleton variant="rounded" height={40} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Skeleton variant="rounded" height={40} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Skeleton variant="rounded" height={40} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Skeleton variant="rounded" height={40} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Skeleton variant="rounded" width={73} height={41} />
            <Skeleton variant="rounded" width={112} height={41} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditLinkFormSkeleton;

