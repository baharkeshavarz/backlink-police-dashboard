"use client";

import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const UserNav = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" alignItems="center">
      <IconButton
        aria-label="Notifications"
        aria-controls={open ? "menu-options" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <Box position="relative" display="inline-flex">
          <Avatar
            alt=""
            src={`${DEFAULT_DASHBOARD_ICONS}/user-icon.png`}
            sx={{ width: 32, height: 32, border: 2, borderColor: "white" }}
          />
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
        <MenuItem sx={{ py: 1, px: 0 }}>
          <Stack width="100%">
            <Typography variant="subtitle2" mx={2} color="grey.700">
              Admin
            </Typography>
            <Typography variant="subtitle2" mx={2} color="grey.700">
              @test@admin.com
            </Typography>
            <Divider sx={{ my: 1 }} />
          </Stack>
        </MenuItem>
        <MenuItem sx={{ py: 1, px: 0 }}>
          <Link href="/profile">
            <Typography variant="subtitle2" mx={2} color="grey.700">
              Your Profile
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem sx={{ py: 1, px: 0 }}>
          <Link href="/settings">
            <Typography variant="subtitle2" mx={2} color="grey.700">
              Settings
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem sx={{ py: 1, px: 0 }}>
          <Link href="/sign-out">
            <Typography variant="subtitle2" mx={2} color="red">
              Sign out
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserNav;
