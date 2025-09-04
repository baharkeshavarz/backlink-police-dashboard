"use client";

import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Divider, IconButton, TextField } from "@mui/material";
import Image from "next/image";
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
          <Image
            alt="delete"
            src={`${DEFAULT_DASHBOARD_ICONS}trash-icon.svg`}
            width={24}
            height={24}
          />
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
