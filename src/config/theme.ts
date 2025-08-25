"use client";

import { GlobalStylesProps, ThemeOptions, createTheme } from "@mui/material";
import Link from "next/link";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    customSize: true;
  }
}

export const globalStyles: GlobalStylesProps["styles"] = (theme) => ({
  "*::-webkit-scrollbar-track": {
    backgroundColor: grey[200],
  },
  "*::-webkit-scrollbar": {
    width: 8,
    backgroundColor: "#F5F5F5",
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: grey[500],
    borderRadius: 12,
  },
  "audio::-webkit-media-controls-enclosure": {
    borderRadius: 12,
  },
  a: {
    textDecoration: "none !important",
  },
  ".MuiSvgIcon-root": {
    width: "1em",
    height: "1em",
  },
  ".radial": {
    background: `radial-gradient(
      96.3% 616.69% at 3.7% 82.29%,
      ${theme.palette.primary.main} 0%,
      ${theme.palette.primary.light} 33.75%,
      ${theme.palette.primary.light} 72.42%,
      ${theme.palette.primary.main} 100%
    )`,
    "&:hover": {
      background: `radial-gradient(
        96.3% 616.69% at 3.7% 82.29%,
        ${theme.palette.primary.main} 0%,
        ${theme.palette.primary.light} 33.75%,
        ${theme.palette.primary.light} 72.42%,
        ${theme.palette.primary.main} 100%
      )`,
    },
  },
});

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#2747f0",
      light: "#36b89f",
      dark: "#02664f",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#017FED",
      dark: "#3D68B5",
      light: "#A2CBF3",
      contrastText: "#FFF",
    },
    background: {
      default: "#111928",
      paper: "#FFF",
    },
  },
  typography: {
    fontFamily: "sfproDisplay, sans-serif",
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "2.5rem", //40px
    },
    h2: {
      fontSize: "1.875rem", //30px
      lineHeight: 1.27,
    },
    h3: {
      fontSize: "1.5rem", //24px
      lineHeight: 1.33,
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.25rem", //20px
      lineHeight: 1.4,
      fontWeight: 500,
    },
    h5: {
      fontSize: "1rem", //16px
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "0.875rem", //14px
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "0.875rem", //14px
      lineHeight: 1.57,
    },
    body2: {
      fontSize: "1.25rem", //20px
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: "1rem", //16px
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: "0.875rem", //14px
      lineHeight: 1.66,
    },
    caption: {
      fontSize: "0.75rem", //12px
      lineHeight: 1.66,
    },
    overline: {
      lineHeight: 1.66,
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiListItem: {
      defaultProps: {
        disableGutters: true,
        disablePadding: true,
      },
    },
    // MuiLink: {
    //   defaultProps: {
    //     component: Link,
    //   },
    // },
    MuiBottomNavigationAction: {
      defaultProps: {
        component: Link,
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
               font-family: 'manrope';
               src: url('/assets/fonts/manrope/Manrope-Light.ttf') format('truetype');
               font-weight: 300;
               font-display: swap;
            },
            @font-face {
               font-family: 'manrope';
               src: url('/assets/fonts/manrope/Manrope-Regular.ttf') format('truetype');
               font-weight: 400;
               font-display: swap;
            },
             @font-face {
               font-family: 'manrope';
               src: url('/assets/fonts/manrope/Manrope-Medium.ttf') format('truetype');
               font-weight: 500;
               font-display: swap;
            },
             @font-face {
               font-family: 'manrope';
               src: url('/assets/fonts/manrope/Manrope-Bold.ttf') format('truetype');
               font-weight: 700;
               font-display: swap;
            },
             @font-face {
               font-family: 'sfproDisplay';
               src: url('/assets/fonts/sfproDisplay/SFPro_Font_License.rtf') format('truetype');
               font-weight: 500;
               font-display: normal;
            },
            @font-face {
               font-family: 'iransans';
               src: url('/assets/fonts/iransansWeb/woff/IRANSansWeb.woff') format('woff');
               font-weight: 500;
               font-style: normal;
             }`,
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       height: 54,
    //     },
    //   },
    // },
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       MuiButton: {
    //         contained: {
    //           height: 55,
    //         },
    //       },
    //     },
    //   },
    // },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1266,
      xl: 1536,
      customSize: 538,
    },
  },
};

export const defaultTheme = createTheme({
  ...themeOptions,
});

export const persianTheme = createTheme({
  ...themeOptions,
  direction: "rtl",
  typography: {
    ...themeOptions.typography,
    fontFamily: "iransans, noto-Arabic",
  },
});
