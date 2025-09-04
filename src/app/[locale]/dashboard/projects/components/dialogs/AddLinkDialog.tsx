import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_415 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import AddLinkForm from "../AddLinkForm";

export type AddLinkDialogProps = DialogProps & { onSuccess: VoidFunction };

const AddLinkDialog: FC<AddLinkDialogProps> = ({ onSuccess, ...props }) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      {...props}
      title="Add Link"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_415, marginX: "auto" }}
      dialogButtons={[]}
    >
      <AddLinkForm onSuccess={onSuccess} />
    </Dialog>
  );
};

export default AddLinkDialog;
