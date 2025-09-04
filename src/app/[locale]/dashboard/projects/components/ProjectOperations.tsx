"use client";

import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Funnel } from "lucide-react";
import AddLinkDialog from "./dialogs/AddLinkDialog";

const ProjectOperations = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddLinkDialog = () => {
    setOpenDialog(!openDialog);
  };
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          variant="text"
          startIcon={<Funnel color="#111928" />}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              bgcolor: "blue.400",
            },
          }}
        >
          <Typography variant="subtitle2" color="grey.800">
            Filter
          </Typography>
        </Button>
        <Button
          variant="contained"
          onClick={handleAddLinkDialog}
          startIcon={<AddIcon sx={{ fontSize: 20 }} />}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            bgcolor: "orange.900",
            "&:hover": {
              bgcolor: "blue.700",
            },
          }}
        >
          <Typography variant="subtitle2"> Add link</Typography>
        </Button>
      </Box>
      <AddLinkDialog
        open={openDialog}
        onClose={handleAddLinkDialog}
        onSuccess={handleAddLinkDialog}
      />
    </>
  );
};

export default ProjectOperations;
