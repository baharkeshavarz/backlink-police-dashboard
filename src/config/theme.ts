"use client";

import { GlobalStylesProps, ThemeOptions, createTheme } from "@mui/material";
import Link from "next/link";
import { grey } from "@mui/material/colors";
import { bluePalette, grayPalette, orangePalette } from "./theme-color";
import { createSvgIcon } from "@mui/material/utils";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    customSize: true;
  }

  interface Palette {
    blue: typeof bluePalette;
    orange: typeof orangePalette;
  }
  interface PaletteOptions {
    blue?: typeof bluePalette;
    orange?: typeof orangePalette;
  }
}

export const globalStyles: GlobalStylesProps["styles"] = () => ({
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
});

const strokeVar = "var(--cb-stroke-width, 3)";

import React from "react";

const UncheckedIcon = createSvgIcon(
  React.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none" },
    React.createElement("rect", {
      x: "3.5",
      y: "3.5",
      width: "16",
      height: "20",
      rx: "4",
      stroke: "currentColor",
      strokeWidth: strokeVar,
    })
  ),
  "CheckboxBlank"
);

const CheckedIcon = createSvgIcon(
  React.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "#2747F0" },
    React.createElement("rect", {
      x: "3.5",
      y: "3.5",
      width: "16",
      height: "16",
      rx: "4",
      stroke: "currentColor",
      strokeWidth: strokeVar,
    }),
    React.createElement("path", {
      d: "M7 12.5l3 3 7-7",
      stroke: "white",
      strokeWidth: strokeVar,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    })
  ),
  "CheckboxChecked"
);

const IndeterminateIcon = createSvgIcon(
  React.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "blue.600" },
    React.createElement("rect", {
      x: "3.5",
      y: "3.5",
      width: "16",
      height: "20",
      rx: "4",
      stroke: "currentColor",
      strokeWidth: strokeVar,
    }),
    React.createElement("path", {
      d: "M7 12h10",
      stroke: "currentColor",
      strokeWidth: strokeVar,
      strokeLinecap: "round",
    })
  ),
  "CheckboxIndeterminate"
);

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
    grey: grayPalette,
    blue: bluePalette,
    orange: orangePalette,
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    htmlFontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "1.875rem", //30px
      lineHeight: 1.5,
    },
    h2: {
      fontSize: "1.5rem", //24px
      lineHeight: 1.27,
    },
    h3: {
      fontSize: "1.25rem", //20px
      lineHeight: 1.33,
    },
    h4: {
      fontSize: "1rem", //16px
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "0.875rem", //14px
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "0.875rem", //14px
      lineHeight: 1.57,
    },
    body1: {
      fontSize: "1rem", //16px
      lineHeight: 1.57,
    },
    body2: {
      fontSize: "1.125rem", //18px
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

    MuiCheckbox: {
      defaultProps: {
        icon: React.createElement(UncheckedIcon),
        checkedIcon: React.createElement(CheckedIcon),
        indeterminateIcon: React.createElement(IndeterminateIcon),
      },
      styleOverrides: {
        root: {
          "--cb-stroke-width": "1",
        },
      },
    },
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
