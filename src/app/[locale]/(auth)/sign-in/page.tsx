"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { customCheckboxSx } from "@/components/common/SharedStyles";
import Title from "@/components/common/Title";
import { CustomCheckbox, FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import {
  DEFAULT_DASHBOARD_PATH,
  DEFAULT_FORGOT_PASSWORD_PATH,
} from "@/constants/routes";
import { SignInPayload } from "@/services/iam/types";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "@/navigation";

const LoginForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const labels: Record<keyof SignInPayload, string> = {
    email: t("common.fields.email"),
    password: t("common.fields.password"),
  };

  const resolveSchema: yup.ObjectSchema<SignInPayload> = yup.object({
    email: yup.string().nullable().required().label(labels.email),
    password: yup.string().nullable().required().label(labels.password),
  });

  const methods = useForm<SignInPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<SignInPayload> = async (payload) => {
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
    });

    if (!result) {
      toast.error(t("messages.authenticationError"));
    } else {
      router.push(DEFAULT_DASHBOARD_PATH);
    }
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
              title={t("pages.signIn.welcomeMsg")}
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
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row">
                    <CustomCheckbox
                      name="rememberMe"
                      label={t("pages.signIn.rememberMe")}
                      disableRipple
                      sx={{
                        ...customCheckboxSx,
                        color: "grey.500",
                      }}
                    />
                  </Stack>
                  <Link href={DEFAULT_FORGOT_PASSWORD_PATH}>
                    <Typography variant="caption" color="blue.600">
                      {t("common.links.resetPassword")}
                    </Typography>
                  </Link>
                </Box>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <ButtonWithLoading
                  // isLoading={isPending}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  <Typography variant="subtitle2">
                    {t("common.buttons.signIn")}
                  </Typography>
                </ButtonWithLoading>
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Container>
    </Box>
  );
};

export default LoginForm;
