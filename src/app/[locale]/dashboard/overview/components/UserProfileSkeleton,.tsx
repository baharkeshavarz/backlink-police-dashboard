"use client";

import { Card, Skeleton, Box } from "@mui/material";

const UserProfileSkeleton = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 5.5,
        my: 2,
        border: 0,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      {/* Avatar Placeholder */}
      <Box
        sx={{
          bgcolor: "#e0e0e0",
          width: 100,
          height: 95,
          borderRadius: "41%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Skeleton variant="text" width={75} height={40} />
      </Box>

      {/* Text Placeholder */}
      <Skeleton variant="text" width={300} height={40} />
    </Card>
  );
};

export default UserProfileSkeleton;
