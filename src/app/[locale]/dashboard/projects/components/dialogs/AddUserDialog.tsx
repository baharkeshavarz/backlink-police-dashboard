import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_415 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import AddUserForm from "../AddUserForm";

export type AddUserDialogProps = DialogProps & { onSuccess: VoidFunction };

const AddUserDialog: FC<AddUserDialogProps> = ({ onSuccess, ...props }) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      {...props}
      title="Add User"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_415, marginX: "auto" }}
      dialogButtons={[]}
    >
      <AddUserForm onSuccess={onSuccess} />
    </Dialog>
  );
};

export default AddUserDialog;
