import { DRAWER_WIDTH, NAVBAR_HEIGHT } from "@/constants/general";
import { Box, Drawer } from "@mui/material";
import SidebarMenus from "./SidebarMenus";

const drawerWidth = DRAWER_WIDTH;

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          bgcolor: (theme) => theme.palette.blue[400],
          top: NAVBAR_HEIGHT,
          height: `calc(100% - ${NAVBAR_HEIGHT}px`,
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        width="100%"
      >
        <Box width="100%">
          <SidebarMenus />
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
