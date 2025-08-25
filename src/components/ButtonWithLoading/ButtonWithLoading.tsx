import { FIXED_BUTTON_HEIGHT } from "@/constants/general";
import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";

export interface ButtonWithLoadingProps extends ButtonProps {
  isLoading?: boolean;
  needStyling?: boolean;
}

const ButtonWithLoading: FC<ButtonWithLoadingProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={isLoading || props.disabled}
      sx={{
        ...props.sx,
        height: FIXED_BUTTON_HEIGHT,
      }}
    >
      {isLoading ? <CircularProgress color="inherit" size={20} /> : children}
    </Button>
  );
};

export default ButtonWithLoading;
