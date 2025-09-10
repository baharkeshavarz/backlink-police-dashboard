import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_463 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import DeactivateAccountForm from "../DeactivateAccountForm";

export type DeactivateAccountDialogProps = DialogProps & {
  userId: string;
  onSuccess: VoidFunction;
  onClose: VoidFunction;
};

const DeactivateAccountDialog: FC<DeactivateAccountDialogProps> = ({
  userId,
  onSuccess,
  onClose,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      onClose={onClose}
      {...props}
      title="Deactivate Account for:"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_463, marginX: "auto" }}
      dialogButtons={[]}
    >
      <DeactivateAccountForm
        userId={userId}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    </Dialog>
  );
};

export default DeactivateAccountDialog;
