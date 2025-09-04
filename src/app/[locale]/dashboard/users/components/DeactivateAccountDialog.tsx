import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_463 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import DeactivateAccountForm from "./DeactivateAccountForm";

export type EditUserDialogProps = DialogProps & {
  userId: string;
  onSuccess: VoidFunction;
};

const DeactivateAccountDialog: FC<EditUserDialogProps> = ({
  userId,
  onSuccess,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      {...props}
      title="Deactivate Account for:"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_463, marginX: "auto" }}
      dialogButtons={[]}
    >
      <DeactivateAccountForm userId={userId} onSuccess={onSuccess} />
    </Dialog>
  );
};

export default DeactivateAccountDialog;
