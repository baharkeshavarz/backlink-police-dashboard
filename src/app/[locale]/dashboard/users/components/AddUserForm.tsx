"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { addUserInvite } from "@/services/users";
import { IUserInvitePayload } from "@/services/users/types";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { FC } from "react";

type AddUserFormProps = {
  onSuccess: VoidFunction;
};

const AddUserForm: FC<AddUserFormProps> = ({ onSuccess }) => {
  const t = useTranslations();
  const labels: Record<keyof IUserInvitePayload, string> = {
    name: "Name",
    email: "Email Address",
  };

  const resolveSchema: yup.ObjectSchema<IUserInvitePayload> = yup.object({
    name: yup.string().required().label(labels.name),
    email: yup.string().required().label(labels.email),
  });

  const methods = useForm<IUserInvitePayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addUserInvite,
  });

  const onSubmit: SubmitHandler<IUserInvitePayload> = async (payload) => {
    const { data, status } = await mutateAsync({ payload });
    if (status === HttpStatusCode.Ok) {
      toast.success(data as string);
      onSuccess?.();
    } else {
      toast.error(t("messages.somethingWentWrong"));
    }
  };

  const fields: FormBuilderProps["fields"] = {
    name: {
      name: "name",
      label: "Name",
      type: "String",
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    email: {
      name: "email",
      label: "Email Address",
      type: "String",
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
        <Grid container spacing={2}>
          <FormBuilder fields={fields} />
          <Grid size={{ xs: 12 }}>
            <ButtonWithLoading
              isLoading={isPending}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: "117px", height: "41px" }}
            >
              <Typography variant="subtitle2">Invite</Typography>
            </ButtonWithLoading>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default AddUserForm;
