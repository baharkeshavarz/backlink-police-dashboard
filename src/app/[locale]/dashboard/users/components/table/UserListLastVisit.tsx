import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";
import React from "react";

const UserListLastVisit = () => {
  return (
    <Box display="flex" alignItems="center" gap={0.5} px={2}>
      <Typography variant="subtitle2" color="grey.500">
        Last account activity: 2 hours ago
      </Typography>
      <Typography variant="subtitle2" color="grey.900">
        2 hours ago
      </Typography>
      <RemoveRedEyeOutlined sx={{ fontSize: 15, color: "grey.400" }} />
    </Box>
  );
};

export default UserListLastVisit;
