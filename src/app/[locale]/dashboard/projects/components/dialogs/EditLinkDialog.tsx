import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_696 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import EditLinkForm from "../EditLinkForm";

export type EditLinkDialogProps = DialogProps & {
  projectId: number;
  onSuccess: VoidFunction;
};

const EditLinkDialog: FC<EditLinkDialogProps> = ({
  projectId,
  onSuccess,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      {...props}
      title="Edit Link"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_696, marginX: "auto" }}
      dialogButtons={[]}
    >
      <EditLinkForm projectId={projectId} onSuccess={onSuccess} />
    </Dialog>
  );
};

export default EditLinkDialog;
