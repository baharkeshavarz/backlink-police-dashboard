"use client";

import { ConfirmProvider, ConfirmProviderProps } from "material-ui-confirm";
import React, { FC, PropsWithChildren, memo, useMemo } from "react";

const ConfirmAlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const defaultOptions = useMemo(() => {
    const defaultOptions: ConfirmProviderProps["defaultOptions"] = {
      confirmationButtonProps: {
        size: "small",
        variant: "contained",
        color: "primary",
        sx: {
          color: "common.white",
        },
      },
      cancellationButtonProps: {
        size: "small",
        variant: "contained",
        color: "error",
      },
      cancellationText: "No",
      confirmationText: "Yest",

      title: "Are you sure?",
      dialogProps: {
        PaperProps: {
          sx: {
            width: 320,
          },
        },
      },
      allowClose: true,
      dialogActionsProps: {
        sx: {
          gap: 1,
        },
      },
    };
    return defaultOptions;
  }, []);

  return (
    <ConfirmProvider defaultOptions={defaultOptions}>
      {children}
    </ConfirmProvider>
  );
};

export default memo(ConfirmAlertProvider);
