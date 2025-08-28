import Logo from "@/components/common/Logo";
import { NAVBAR_HEIGHT } from "@/constants/general";
import { Box } from "@mui/material";
import AppBarComponent from "./AppBarComponent";

const TopBar = () => {
  return (
    <>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={(theme) => theme.zIndex.appBar}
        height={NAVBAR_HEIGHT}
        sx={{ bgcolor: (theme) => theme.palette.blue[700], px: 1.5 }}
      >
        <Box display="flex" alignItems="center">
          <Logo />
          <Box sx={{ flex: 1 }}>
            <AppBarComponent />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TopBar;
