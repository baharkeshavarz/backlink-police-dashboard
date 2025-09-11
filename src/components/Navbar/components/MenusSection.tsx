"use client";

import { CustomButton } from "@/components/common/CustomStyle";
import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
import { Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MenusSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const pagesMenu = [{ label: "Sig In", href: DEFAULT_SIGNIN_PATH }];

  return (
    <Stack
      sx={{
        p: 1,
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        flexWrap: "wrap",
        justifyContent: isSmallScreen ? "center" : "flex-start",
        alignItems: "center",
        gap: 1,
      }}
    >
      {pagesMenu?.map((page) => (
        <CustomButton
          href={page.href}
          key={page.label}
          sx={{
            color: theme.palette.common.white,
            textTransform: "none",
            fontSize: "0.9rem",
          }}
        >
          {page.label}
        </CustomButton>
      ))}
    </Stack>
  );
};

export default MenusSection;
