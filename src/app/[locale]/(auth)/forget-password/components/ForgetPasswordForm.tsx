"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import Logo from "@/components/common/Logo";
import Title from "@/components/common/Title";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { FIXED_BOX_410 } from "@/constants/general";
import { forgetPassword } from "@/services/iam";
import { ForgetPasswordPayload } from "@/services/iam/types";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

const ForgetPasswordForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const labels: Record<keyof ForgetPasswordPayload, string> = {
    email: t("common.fields.email"),
  };

  const resolveSchema: yup.ObjectSchema<ForgetPasswordPayload> = yup.object({
    email: yup.string().nullable().required().label(labels.email),
  });

  const methods = useForm<ForgetPasswordPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgetPassword,
  });

  const onSubmit: SubmitHandler<ForgetPasswordPayload> = async (payload) => {};

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
      <Box p={4}>
        <Logo />
      </Box>
      <Container maxWidth="customSize">
        <FormProvider {...methods}>
          <Box bgcolor="common.white" p={4} borderRadius={2}>
            <Box sx={{ width: FIXED_BOX_410, mx: "auto" }}>
              <Title
                title={t("pages.forgetPassword.titleMsg")}
                subTitle={t("pages.forgetPassword.subTitleMsg")}
                sx={{ my: 2, textAlign: "left", fontWeight: 500 }}
              />
            </Box>
            <Grid
              container
              spacing={2}
              mt={4}
              component="form"
              onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
            >
              <FormBuilder fields={fields} />
              <Grid size={{ xs: 12 }}>
                <ButtonWithLoading
                  isLoading={isPending}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  <Typography variant="subtitle2">
                    {t("pages.forgetPassword.forgetButton")}
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

export default ForgetPasswordForm;
