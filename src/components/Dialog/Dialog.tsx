import { Close } from "@mui/icons-material";
import {
  DialogActions,
  Divider,
  Grid,
  IconButton,
  SxProps,
  Typography,
} from "@mui/material";
import MuiDialog, {
  type DialogProps as MuiDialogProps,
} from "@mui/material/Dialog";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FC } from "react";
import { ButtonWithLoading } from "../ButtonWithLoading";
import { DialogTransition } from "../DialogTransition";
import type { ButtonWithLoadingProps } from "../ButtonWithLoading/ButtonWithLoading";

export interface DialogProps extends MuiDialogProps {
  dialogContentProps?: DialogContentProps;
  dialogButtons?: ButtonWithLoadingProps[];
  showDialogTitle?: boolean;
  dialogActionSx?: SxProps;
}

const Dialog: FC<DialogProps> = ({
  title,
  showDialogTitle = true,
  dialogButtons,
  dialogActionSx = {},
  ...props
}) => {
  return (
    <MuiDialog
      fullWidth
      maxWidth={false}
      sx={{
        borderRadius: 0.7,
        ...props?.sx,
      }}
      slots={{
        transition: DialogTransition,
      }}
      {...props}
      slotProps={{
        ...props?.slotProps,
        paper: { sx: { margin: 0, width: "100%" } },
      }}
    >
      {showDialogTitle && (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography variant="h4" fontWeight="700">
              {title}
            </Typography>
            <IconButton
              aria-label="close-dialog"
              onClick={() => {
                props.onClose?.({}, "escapeKeyDown");
              }}
            >
              <Close sx={{ fontSize: 18 }} />
            </IconButton>
          </DialogTitle>
          {title && <Divider />}
        </>
      )}
      <DialogContent {...props.dialogContentProps}>
        {props.children}
      </DialogContent>
      {dialogButtons && dialogButtons?.length > 0 && (
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={0.2} sx={{ ...dialogActionSx }}>
            {dialogButtons?.map((button, index) => {
              return (
                <Grid key={index} size={{ xs: 12 }}>
                  <ButtonWithLoading
                    needStyling={button.needStyling}
                    key={index}
                    {...button}
                  />
                </Grid>
              );
            })}
          </Grid>
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;
