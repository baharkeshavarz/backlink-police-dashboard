"use client";

import { Box, Grid, Skeleton } from "@mui/material";

const EditUserFormSkeleton = () => {
  return (
    <Box>
      <Grid container spacing={1.5}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid key={index} size={{ xs: 6 }}>
            <Box>
              <Skeleton
                variant="text"
                width={120}
                height={18}
                sx={{ mb: 0.5 }}
              />
              <Skeleton
                variant="rectangular"
                height={41}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          </Grid>
        ))}

        <Grid size={{ xs: 12 }}>
          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <Skeleton
              variant="rectangular"
              width={179}
              height={41}
              sx={{ borderRadius: 1 }}
            />
            <Skeleton
              variant="rectangular"
              width={73}
              height={41}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUserFormSkeleton;
