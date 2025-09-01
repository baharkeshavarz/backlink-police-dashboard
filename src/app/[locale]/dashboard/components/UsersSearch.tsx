"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Divider, IconButton, TextField } from "@mui/material";
import { useState } from "react";

const UsersSearch = () => {
  const [search, setSearch] = useState("");

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      <TextField
        size="small"
        placeholder="Search for users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          width: 562,
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />
      <Box display="flex" alignItems="center">
        <Divider orientation="vertical" sx={{ mx: 1, height: 19 }} />
        <IconButton>
          <SettingsIcon sx={{ fontSize: 19 }} />
        </IconButton>
        <IconButton>
          <DeleteIcon sx={{ fontSize: 19 }} />
        </IconButton>
        <IconButton>
          <InfoIcon sx={{ fontSize: 19 }} />
        </IconButton>
        <IconButton>
          <MoreVertIcon sx={{ fontSize: 19 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default UsersSearch;
