"use client";

import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        aria-label="Notifications"
        aria-controls={open ? "menu-options" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ p: 0.5 }}
      >
        <Box position="relative" display="inline-flex">
          <Image
            alt="Notifications"
            src={`${DEFAULT_DASHBOARD_ICONS}/notification-icon.svg`}
            width={20}
            height={20}
          />
          <Box
            sx={{
              position: "absolute",
              top: -8,
              right: -8,
              p: 0.5,
              borderRadius: "50%",
              bgcolor: (theme) => theme.palette.blue[700],
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                bgcolor: (theme) => theme.palette.orange[900],
              }}
            />
          </Box>
        </Box>
      </IconButton>

      <Menu
        id="menu-options"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 250,
              py: 1.2,
              borderRadius: 0.5,
            },
          },
        }}
      >
        <MenuItem sx={{ py: 1 }}>
          <Typography variant="subtitle1" ml={1}>
            Notification 1
          </Typography>
        </MenuItem>
        <MenuItem sx={{ py: 1 }}>
          <Typography variant="subtitle1" ml={1}>
            Notification 2
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Notification;
