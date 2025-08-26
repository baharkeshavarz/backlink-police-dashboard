"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import Title from "@/components/common/Title";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { DEFAULT_SIGNUP_PATH } from "@/constants/routes";
import { signIn } from "@/services/iam";
import { ResetPasswordPayload } from "@/services/iam/types";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import CheckClubRulesForm from "./components/CheckRulesForm";

const ResetPassword = () => {
  const t = useTranslations();
  const router = useRouter();

  const labels: Record<keyof ResetPasswordPayload, string> = {
    email: t("common.fields.email"),
    password: t("common.fields.password"),
    confirmPassword: t("common.fields.confirmPassword"),
  };

  const resolveSchema: yup.ObjectSchema<ResetPasswordPayload> = yup.object({
    email: yup.string().nullable().required().label(labels.email),
    password: yup.string().nullable().required().label(labels.password),
    confirmPassword: yup
      .string()
      .nullable()
      .required()
      .oneOf([yup.ref("password")], "passwordMustMatch")
      .label(labels.confirmPassword),
  });

  const methods = useForm<ResetPasswordPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signIn,
  });

  const onSubmit: SubmitHandler<ResetPasswordPayload> = async (payload) => {
    // await mutateAsync({ payload });
    // router.push(DEFAULT_DASHBOARD_CHAT_PATH + `/${SAMPLE_CHAT_ID}`);
    router.push(DEFAULT_SIGNUP_PATH);
  };

  const fields: FormBuilderProps["fields"] = {
    email: {
      name: "email",
      label: labels.email,
      type: "String",
      props: {
        placeholder: t("common.fields.emailPlaceholder"),
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    password: {
      name: "password",
      label: labels.password,
      type: "String",
      props: {
        placeholder: t("common.fields.passwordPlaceholder"),
        type: "password",
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    confirmPassword: {
      type: "String",
      name: "confirmPassword",
      label: labels.confirmPassword,
      props: {
        type: "password",
        placeholder: t("common.fields.passwordPlaceholder"),
        inputProps: {
          autoComplete: "new-password",
        },
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      overflow="hidden"
    >
      <Container maxWidth="customSize">
        <FormProvider {...methods}>
          <Box bgcolor="common.white" width="100%" p={4} borderRadius={2}>
            <Title
              title={t("pages.resetPassword.titleMsg")}
              sx={{ my: 2, textAlign: "left" }}
            />
            <Grid
              container
              spacing={2}
              component="form"
              onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
            >
              <FormBuilder fields={fields} />
              <Grid size={{ xs: 12 }}>
                <CheckClubRulesForm />
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Container>
    </Box>
  );
};

export default ResetPassword;
