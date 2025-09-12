"use client";

import { Box, Grid, Skeleton } from "@mui/material";

const AddLinkFormSkeleton = () => {
  return (
    <Box>
      <Grid container spacing={2}>
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
          <Skeleton variant="rounded" height={40} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Skeleton variant="rounded" height={41} width={117} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddLinkFormSkeleton;

