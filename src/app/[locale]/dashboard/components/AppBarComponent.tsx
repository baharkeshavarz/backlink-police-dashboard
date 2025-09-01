"use client";

import { Avatar, Toolbar } from "@mui/material";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import Notification from "./notification/Notification";
import UserNav from "./UserNav";

const AppBarComponent = () => {
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
      <Avatar
        alt=""
        src={`${DEFAULT_DASHBOARD_ICONS}/grid-icon.svg`}
        sx={{ width: 17, height: 19 }}
      />
      <Notification />
      <UserNav />
    </Toolbar>
  );
};

export default AppBarComponent;
