"use client";

import React from "react";
import {
  AppBar,
  Box,
  useTheme,
  Container,
  IconButton,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../common/Logo";
import MenusSection from "./components/MenusSection";
import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
import { CustomButton } from "../common/CustomStyle";
import { NAVBAR_HEIGHT } from "@/constants/general";
import LanguageSelector from "../LanguageSelector/LocaleSwitcher";

const Navbar = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar
      elevation={0}
      position="sticky"
      sx={{
        p: 0,
        height: NAVBAR_HEIGHT,
        backgroundColor: theme.palette.common.black,
        top: 0,
        zIndex: theme.zIndex.drawer,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          px: { xs: 2, sm: 3, md: 10 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box display={{ xs: "none", md: "flex" }} width="100%">
          <MenusSection />
          <Box display="flex" justifyContent="center" alignItems="center">
            <CustomButton variant="contained" size="medium">
              Let’s Start
            </CustomButton>
            <LanguageSelector />
          </Box>
        </Box>

        <Box display={{ xs: "flex", md: "none" }} p={1}>
          <IconButton onClick={handleDrawerToggle} color="inherit">
            <MenuIcon />
          </IconButton>
          <Link href={DEFAULT_SIGNIN_PATH}>
            <Logo />
          </Link>
        </Box>
      </Container>

      {mobileOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            width: "100vw",
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* <MenusSection /> */} MenusSection
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
