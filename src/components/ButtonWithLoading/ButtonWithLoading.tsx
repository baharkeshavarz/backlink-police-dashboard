import { FIXED_BUTTON_HEIGHT } from "@/constants/general";
import { Button, ButtonProps, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { Spinner } from "../common/SpinnerComponent";

export interface ButtonWithLoadingProps extends ButtonProps {
  isLoading?: boolean;
  needStyling?: boolean;
}

const ButtonWithLoading: FC<ButtonWithLoadingProps> = ({
  isLoading,
  children,
  ...props
}) => {
  const theme = useTheme();
  // Resolve background color for disabled state
  const disabledBg =
    props.color && theme.palette[props.color as keyof typeof theme.palette]
      ? (
          theme.palette[props.color as keyof typeof theme.palette] as {
            main: string;
          }
        ).main
      : undefined;
  return (
    <Button
      {...props}
      disabled={isLoading || props.disabled}
      sx={{
        ...props.sx,
        height: FIXED_BUTTON_HEIGHT,
        "&:hover": {
          bgcolor: "blue.700",
        },
        "&.Mui-disabled": {
          backgroundColor: disabledBg,
          color: (theme) => theme.palette.common.white,
          cursor: "not-allowed",
          opacity: 0.9,
        },
      }}
    >
      {isLoading ? (
        <>
          <Spinner variant="bars" />
          <Typography variant="subtitle2">Processing...</Typography>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default ButtonWithLoading;
