import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { ImageUploader } from "@/components/ImageUploader/ImageUploader";
import { deleteUserProfileAvatar } from "@/services/profile";
import { updateUserAvatar } from "@/services/users";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import useGetUserDetails from "../hooks/useGetUserDetails";

type ProfilePictureFormProps = {
  onClose: VoidFunction;
  onSuccess?: VoidFunction;
};

const ProfilePictureForm: React.FC<ProfilePictureFormProps> = ({
  onClose,
  onSuccess,
}) => {
  const t = useTranslations();
  const params = useParams<{ userId: string }>();
  const userId = params.userId ? params.userId : "";
  const { data: userProfile } = useGetUserDetails({ userId });

  const [file, setFile] = useState<File | null>(null);
  const [tempFile, setTempFile] = useState<File | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUserAvatar,
  });

  const handleDialogSave = async () => {
    if (tempFile) {
      const formData = new FormData();
      formData.append("AvatarFile", tempFile);

      const { data, status } = await mutateAsync({
        payload: formData,
        params: { ...userProfile },
      });

      if (status === HttpStatusCode.Ok) {
        setFile(tempFile);
        toast.success(data as string);
        onSuccess?.();
        onClose?.();
      } else {
        toast.error(t("messages.somethingWentWrong"));
      }
    }
  };

  const deleteAvatarHandler = async () => {
    const { data, status } = await mutateAsync({
      params: { ...userProfile },
    });
    if (status === HttpStatusCode.Ok) {
      setFile(null);
      toast.success(data as string);
      onSuccess?.();
      onClose?.();
    } else {
      toast.error(t("messages.somethingWentWrong"));
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
          value={tempFile || file}
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
            disabled={isPending}
            onClick={deleteAvatarHandler}
          >
            <Typography variant="subtitle2">Delete Image</Typography>
          </ButtonWithLoading>
          <ButtonWithLoading
            type="submit"
            variant="contained"
            disabled={isPending}
            size="medium"
            sx={{ width: "73px", height: "41px" }}
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
