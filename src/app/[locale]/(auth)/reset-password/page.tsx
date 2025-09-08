"use client";

import Title from "@/components/common/Title";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { ResetPasswordPayload } from "@/services/iam/types";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { resetPassword } from "@/services/iam";
import { useSearchParams } from "next/navigation";
import CheckTermsRulesForm from "./components/CheckTermsRulesForm";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";
  const t = useTranslations();

  const labels: Record<keyof ResetPasswordPayload, string> = {
    email: t("common.fields.email"),
    password: t("common.fields.password"),
    passwordConfirm: t("common.fields.passwordConfirm"),
    terms: t("common.fields.terms"),
    token: t("common.fields.token"),
  };

  const resolveSchema: yup.ObjectSchema<ResetPasswordPayload> = yup.object({
    email: yup.string().nullable().required().label(labels.email),
    password: yup.string().nullable().required().label(labels.password),
    terms: yup
      .boolean()
      .required()
      .oneOf([true], "You must accept the Terms of Service"),
    token: yup.string().required(),
    passwordConfirm: yup
      .string()
      .nullable()
      .required()
      .oneOf([yup.ref("password")], "Password Must Match!")
      .label(labels.passwordConfirm),
  });

  const methods = useForm<ResetPasswordPayload>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {
      email: email || "",
      password: "",
      passwordConfirm: "",
      terms: false,
      token: token || "",
    },
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const { mutateAsync } = useMutation({
    mutationFn: resetPassword,
  });

  const onSubmit: SubmitHandler<ResetPasswordPayload> = async (payload) => {
    await mutateAsync({ payload });
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
    passwordConfirm: {
      type: "String",
      name: "passwordConfirm",
      label: labels.passwordConfirm,
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
                <CheckTermsRulesForm />
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Container>
    </Box>
  );
};

export default ResetPassword;
