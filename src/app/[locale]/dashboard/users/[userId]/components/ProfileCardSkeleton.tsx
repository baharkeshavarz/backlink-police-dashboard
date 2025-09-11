"use client";

import { Avatar, Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

const ProfileCardSkeleton = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        border: 0,
        borderRight: 1,
        borderRadius: 0,
        borderColor: "grey.200",
        height: "100%",
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Avatar sx={{ width: 80, height: 80, borderRadius: 1 }}>
            <Skeleton variant="circular" width={80} height={80} />
          </Avatar>
          <Skeleton variant="text" width={160} height={28} />
          <Box display="flex" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={13} height={13} />
            <Skeleton variant="text" width={120} height={20} />
          </Box>
        </Stack>

        <Box mt={2}>
          <Skeleton variant="text" width={110} height={18} />
          <Skeleton variant="text" width="80%" height={18} />
        </Box>

        <Box mt={1.5}>
          <Skeleton variant="text" width={140} height={18} />
          <Skeleton variant="text" width="90%" height={18} />
        </Box>

        <Box mt={1.5}>
          <Skeleton variant="text" width={120} height={18} />
          <Skeleton variant="text" width="60%" height={18} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCardSkeleton;
