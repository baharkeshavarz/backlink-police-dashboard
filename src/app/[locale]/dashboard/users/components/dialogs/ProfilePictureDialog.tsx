import Dialog, { DialogProps } from "@/components/Dialog/Dialog";
import { DEFAULT_MAX_WIDTH_713 } from "@/constants/general";
import { FC } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import ProfilePictureForm from "../ProfilePictureForm";

export type ProfilePictureDialogProps = DialogProps & {
  onClose: VoidFunction;
  onSuccess?: VoidFunction;
};

const ProfilePictureDialog: FC<ProfilePictureDialogProps> = ({
  onClose,
  onSuccess,
  ...props
}) => {
  const { isMobile } = useAppContext();
  return (
    <Dialog
      onClose={onClose}
      {...props}
      title="Edit avatar"
      maxWidth="md"
      sx={{ width: isMobile ? "100%" : DEFAULT_MAX_WIDTH_713, marginX: "auto" }}
      dialogButtons={[]}
    >
      <ProfilePictureForm onClose={onClose} onSuccess={onSuccess} />
    </Dialog>
  );
};

export default ProfilePictureDialog;
