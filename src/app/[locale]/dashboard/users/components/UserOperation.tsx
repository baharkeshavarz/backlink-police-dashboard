"use client";

import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import AddUserDialog from "./AddUserDialog";
import { useState } from "react";

const UserOperation = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddUserDialog = () => {
    setOpenDialog(!openDialog);
  };
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          variant="contained"
          onClick={handleAddUserDialog}
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
      <AddUserDialog
        open={openDialog}
        onClose={handleAddUserDialog}
        onSuccess={handleAddUserDialog}
      />
    </>
  );
};

export default UserOperation;
