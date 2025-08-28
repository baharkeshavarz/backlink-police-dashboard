"use client";

import { Avatar, Toolbar } from "@mui/material";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import Notification from "./notification/Notification";
// import UserInfoDialog from "./profile/UserInfoDialog";

const AppBarComponent = () => {
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
      <Avatar
        alt=""
        src={`${DEFAULT_DASHBOARD_ICONS}/grid-icon.svg`}
        sx={{ width: 17, height: 19 }}
      />
      <Notification />
      <Avatar
        alt=""
        src={`${DEFAULT_DASHBOARD_ICONS}/user-icon.png`}
        sx={{ width: 32, height: 32, border: 2, borderColor: "white" }}
      />
      {/* <UserInfoDialog open={openDialog} onClose={handleOpenEditProfile} /> */}
    </Toolbar>
  );
};

export default AppBarComponent;
