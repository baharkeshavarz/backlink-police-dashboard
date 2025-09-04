import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_463 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import DeleteAccountForm from "./DeleteAccountForm";
import { Paper } from "@mui/material";

export type DeleteAccountDialogProps = DialogProps & {
  userId: string;
  onSuccess: VoidFunction;
};

const DeleteAccountDialog: FC<DeleteAccountDialogProps> = ({
  userId,
  onSuccess,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      {...props}
      title="Delete Account for:"
      maxWidth="sm"
      sx={{
        width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_463,
        marginX: "auto",
      }}
      dialogButtons={[]}
    >
      <DeleteAccountForm userId={userId} onSuccess={onSuccess} />
    </Dialog>
  );
};

export default DeleteAccountDialog;
