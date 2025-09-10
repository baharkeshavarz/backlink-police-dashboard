import { ButtonWithLoadingText } from "@/components/ButtonWithLoading";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import UserProfileCard from "./UserProfileCard";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/services/users";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useRouter } from "@/navigation";
import { DEFAULT_DASHBOARD_USERS_PATH } from "@/constants/routes";

type DeleteAccountFormProps = {
  userId: string;
  onSuccess?: VoidFunction;
  onClose: VoidFunction;
};
type DeleteAccountPayload = { delete: string };

const DeleteAccountForm: FC<DeleteAccountFormProps> = ({
  userId,
  onSuccess,
  onClose,
}) => {
  const router = useRouter();
  const labels = {
    delete: "delete",
  };

  const resolveSchema: yup.ObjectSchema<DeleteAccountPayload> = yup.object({
    delete: yup
      .string()
      .oneOf(["DELETE"], "You must type 'DELETE' to confirm")
      .required()
      .label(labels.delete),
  });

  const methods = useForm<DeleteAccountPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteUser,
  });

  const onSubmit: SubmitHandler<DeleteAccountPayload> = async () => {
    const { data, status } = await mutateAsync({ params: { id: userId } });
    console.log(data);
    if (status === HttpStatusCode.Ok) {
      toast.success("data");
      onSuccess?.();
      router.push(DEFAULT_DASHBOARD_USERS_PATH);
    }
  };

  const fields: FormBuilderProps["fields"] = {
    delete: {
      name: "delete",
      label: "Type “DELETE” in the field below to confirm",
      type: "String",
      props: {
        placeholder: "DELETE",
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <>
      <UserProfileCard userId={userId} />
      <FormProvider {...methods}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <Grid size={{ xs: 12 }}>
            <Stack>
              <Typography variant="h3" fontWeight={700} color="grey.900">
                Deleting account will do the following:
              </Typography>
              <Typography variant="subtitle1" color="#F05252" my={2}>
                Account deletion is final. There will be no way to restore this
                account.
              </Typography>
            </Stack>
          </Grid>
          <FormBuilder fields={fields} />

          <Grid size={{ xs: 12 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              mt={1}
            >
              <ButtonWithLoadingText
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "134px", height: "41px" }}
                onClick={() => onClose()}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  Keep Account
                </Typography>
              </ButtonWithLoadingText>
              <ButtonWithLoadingText
                disabled={isPending}
                type="submit"
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<Trash2 />}
                sx={{ width: "228px", height: "41px" }}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  Delete Account Anyway
                </Typography>
              </ButtonWithLoadingText>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default DeleteAccountForm;
