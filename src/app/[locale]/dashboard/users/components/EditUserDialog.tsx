import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_696 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import EditUserForm from "./EditUserForm";
import EditUserProfile from "./EditUserProfile";

export type EditUserDialogProps = DialogProps & {
  userId: string;
  onSuccess: VoidFunction;
};

const EditUserDialog: FC<EditUserDialogProps> = ({
  userId,
  onSuccess,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      {...props}
      title="Edit User"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_696, marginX: "auto" }}
      dialogButtons={[]}
    >
      <EditUserProfile userId={userId} onSuccess={onSuccess} />
    </Dialog>
  );
};

export default EditUserDialog;
