"use client";

import Logo from "@/components/common/Logo";
import Title from "@/components/common/Title";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { DEFAULT_SIGNUP_PATH } from "@/constants/routes";
import { forgetPassword } from "@/services/iam";
import { ForgetPasswordPayload } from "@/services/iam/types";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Countdown from "react-countdown";
import { RESEND_AUTH_TIMER } from "@/constants/general";
import { useState } from "react";

const ForgetPasswordRecoveryLink = () => {
  const t = useTranslations();
  const router = useRouter();
  const [timerEndDate, setTimerEndDate] = useState(
    Date.now() + RESEND_AUTH_TIMER * 1000
  );

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

  const onSubmit: SubmitHandler<ForgetPasswordPayload> = async (payload) => {
    router.push(DEFAULT_SIGNUP_PATH);
  };

  const handleClickOnSendAgain = async () => {
    setTimerEndDate(Date.now() + RESEND_AUTH_TIMER * 1000);
  };

  const fields: FormBuilderProps["fields"] = {
    email: {
      name: "email",
      type: "String",
      label: "",
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
            <Title
              title={t("pages.forgetPassword.titleMsg")}
              sx={{ my: 2, textAlign: "left", fontWeight: 500 }}
            />
            <Grid
              container
              spacing={2}
              mt={4}
              component="form"
              onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
            >
              <FormBuilder fields={fields} />
              <Typography variant="subtitle2" color="#234F18">
                {t("pages.forgetPassword.recoveryMsg")}
              </Typography>
              <Grid size={{ xs: 12 }}>
                <Countdown
                  key={timerEndDate}
                  date={timerEndDate}
                  renderer={({ completed, minutes, seconds }) => (
                    <Box width="100%">
                      {completed ? (
                        <Button
                          variant="text"
                          onClick={handleClickOnSendAgain}
                          disabled={!completed}
                          fullWidth
                          sx={{ mt: 2, bgcolor: "grey.200", color: "grey.600" }}
                        >
                          {t("common.buttons.sendLinkAgain")}
                        </Button>
                      ) : (
                        <Button
                          variant="text"
                          onClick={handleClickOnSendAgain}
                          disabled={!completed}
                          fullWidth
                          sx={{ mt: 2, bgcolor: "grey.200", color: "grey.600" }}
                        >
                          <Stack direction="row" spacing={1}>
                            <Typography variant="body1" color="grey.400">
                              {t("pages.forgetPassword.forgetRecoveryButton")}
                            </Typography>
                            <Typography
                              variant="body1"
                              color="grey.400"
                              fontWeight={700}
                            >
                              {`${String(minutes).padStart(2, "0")}:${String(
                                seconds
                              ).padStart(2, "0")}`}
                            </Typography>
                          </Stack>
                        </Button>
                      )}
                    </Box>
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </FormProvider>
      </Container>
    </Box>
  );
};

export default ForgetPasswordRecoveryLink;
