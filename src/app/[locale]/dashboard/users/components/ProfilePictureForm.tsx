import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";
import { updateProfileAvatar } from "@/services/profile";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "sonner";

type ProfilePictureFormProps = {
  onClose: VoidFunction;
  onSuccess?: VoidFunction;
};

const ProfilePictureForm: React.FC<ProfilePictureFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const t = useTranslations();
  const [file, setFile] = useState<File | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProfileAvatar,
  });

  const handleDialogSave = async () => {
    if (tempFile) {
      setFile(tempFile);
      setTempFile(null);
      const formData = new FormData();
      formData.append("Avatar", tempFile);

      const { data, status } = await mutateAsync({
        payload: formData,
      });

      if (status === HttpStatusCode.Ok) {
        toast.success(data as string);
        onSuccess?.();
        onClose?.();
      } else {
        toast.error(t("messages.somethingWentWrong"));
      }
    }
  };

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDialogSave();
        }}
      >
        <ImageUploader
          value={tempFile}
          onChange={setTempFile}
          displayPreview={true}
          size={30 * 1024 * 1024}
          inputClassName=""
        />
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <ButtonWithLoading
            variant="outlined"
            color="error"
            type="submit"
            disabled={!tempFile}
          >
            <Typography variant="subtitle2">Delete Image</Typography>
          </ButtonWithLoading>
          <ButtonWithLoading
            type="submit"
            variant="contained"
            size="small"
            isLoading={isPending}
          >
            <Typography variant="subtitle2" color="white">
              Save
            </Typography>
          </ButtonWithLoading>
        </Box>
      </form>
    </Box>
  );
};

export default ProfilePictureForm;
