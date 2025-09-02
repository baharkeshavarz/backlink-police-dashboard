"use client";

import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";

const UserOperation = () => {
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ fontSize: 20 }} />}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              bgcolor: "blue.700",
            },
          }}
        >
          <Typography variant="subtitle2"> Add user</Typography>
        </Button>
        <Button
          variant="outlined"
          startIcon={
            <Image
              alt=""
              src={`${DEFAULT_DASHBOARD_ICONS}/document-download-icon.svg`}
              width={20}
              height={20}
            />
          }
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          <Typography variant="subtitle2" color="grey.800">
            Export
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default UserOperation;
