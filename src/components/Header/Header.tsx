"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import { CustomButton } from "../common/CustomStyle";

const Header = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.palette.background.paper}
      height={400}
      flexDirection="column"
      gap={2}
    >
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack gap={1}>
          <Typography variant="h4">Reconnect with Memories.</Typography>
          <Typography variant="h4">Cherish the Moments.</Typography>
        </Stack>
        <Stack gap={1} mt={2}>
          <Typography variant="body1">
            Eternity Chat uses AI to help you engage in heartfelt
          </Typography>
          <Typography variant="body1">
            conversations with your loved ones, even when they&apos;re gone.
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" gap={2} mt={2}>
        <CustomButton variant="contained">Let&apos;s Start</CustomButton>
        <CustomButton variant="outlined">Try Demo</CustomButton>
      </Stack>
    </Box>
  );
};

export default Header;
