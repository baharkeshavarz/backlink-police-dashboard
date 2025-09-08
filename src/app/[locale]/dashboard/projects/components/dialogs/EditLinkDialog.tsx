import { Dialog } from "@/components/Dialog";
import { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_463 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import EditLinkForm from "../EditLinkForm";

export type EditLinkDialogProps = DialogProps & {
  projectId: number;
  onSuccess: VoidFunction;
  onClose: VoidFunction;
};

const EditLinkDialog: FC<EditLinkDialogProps> = ({
  projectId,
  onSuccess,
  onClose,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      {...props}
      title="Edit Link"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_463, marginX: "auto" }}
      dialogButtons={[]}
      onClose={onClose}
    >
      <EditLinkForm
        projectId={projectId}
        onSuccess={onSuccess}
        onClose={onClose}
      />
    </Dialog>
  );
};

export default EditLinkDialog;
