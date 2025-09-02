"use client";

import { useTheme } from "@mui/material";
import { Toaster as Sonner, ToasterProps } from "sonner";

const ToasterProvider = ({ ...props }: ToasterProps) => {
  const theme = useTheme();

  return (
    <Sonner
      theme={theme.palette.mode as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "common.white",
          "--normal-text": "common.black",
          "--normal-border": "common.white",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default ToasterProvider;
