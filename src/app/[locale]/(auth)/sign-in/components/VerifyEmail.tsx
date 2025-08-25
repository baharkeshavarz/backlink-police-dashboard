"use client";

import { RESEND_AUTH_TIMER } from "@/constants/general";
import { DEFAULT_SIGNIN_PATH } from "@/constants/routes";
// import { loginByOtp, sendLoginOtp } from "@/services/account";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { digitsFaToEn } from "@persian-tools/persian-tools";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import * as yup from "yup";

type FieldNames = Record<"password", string>;

const VerifyEmail = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timerEndDate, setTimerEndDate] = useState(
    Date.now() + RESEND_AUTH_TIMER * 1000
  );

  const userName = searchParams.get("username") || "sample@backlink.com"; //todo
  const entryPoint = searchParams.get("backUrl") || "";

  const labels: Record<keyof FieldNames, string> = {
    password: t("pages.confirm.fields.code"),
  };

  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    password: yup.string().nullable().required().min(6).label(labels.password),
  });

  const methods = useForm<FieldNames>({
    resolver: yupResolver(resolveSchema),
  });

  const { control, handleSubmit, watch } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: FieldNames) => {
      //   const { data } = await loginByOtp({
      //     payload: { ...payload, userName },
      //   });
      //   if (data?.succeed) {
      //         auth.login(data?.value);
      //         auth.loadUser();
      //     if (entryPoint) {
      //         router.push(DEFAULT_LANDING_PAGE);
      //     } else {
      //       router.push(DEFAULT_DASHBOARD_PATH);
      //     }
      //   }
    },
  });

  const onSubmit: SubmitHandler<FieldNames> = async (payload) => {
    await mutateAsync(payload);
  };

  const [password] = watch(["password"]);

  useEffect(() => {
    if (!userName) {
      router.push(DEFAULT_SIGNIN_PATH);
    }
  }, [userName, router]);

  useEffect(() => {
    if (password?.length === 5) {
      handleSubmit(onSubmit)();
    }
  }, [password, handleSubmit]);

  const { mutateAsync: mutateAsyncSendAgain, isPending: isPendingSendAgain } =
    useMutation({
      // mutationFn: sendLoginOtp,
    });

  const handleClickOnSendAgain = async () => {
    setTimerEndDate(Date.now() + RESEND_AUTH_TIMER * 1000);
    // await mutateAsyncSendAgain({ payload: { userName } });
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
        <Box bgcolor="common.white" width="100%" p={4} borderRadius={2}>
          <Stack spacing={2}>
            <Typography>{t("pages.signInConfirm.checkEmail")}</Typography>
            <Typography>{t("pages.signInConfirm.enterCode")}</Typography>
            <Typography variant="body1">
              {t("pages.signInConfirm.enterCodeMessage", {
                email: userName,
              })}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Controller
                control={control}
                name="password"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <OtpInput
                        containerStyle={{
                          direction: "ltr",
                          justifyContent: "space-between",
                        }}
                        inputStyle={{
                          width: 40,
                          height: 40,
                          marginRight: 8,
                          borderRadius: 4,
                          boxShadow: "none",
                          outlineWidth: 0,
                          border: "1px solid",
                          borderColor: error?.message ? red[500] : grey[300],
                          textAlign: "center",
                          fontSize: 24,
                        }}
                        value={value}
                        onChange={(value) => {
                          onChange(digitsFaToEn(value));
                        }}
                        numInputs={5}
                        inputType="tel"
                        renderInput={(props) => <input {...props} />}
                      />
                      {!!error?.message && (
                        <FormHelperText error sx={{ textAlign: "center" }}>
                          {error.message as string}
                        </FormHelperText>
                      )}
                    </>
                  );
                }}
              />
            </Box>
            <Countdown
              key={timerEndDate}
              date={timerEndDate}
              renderer={({ completed, minutes, seconds }) => (
                <Stack spacing={1}>
                  <Typography variant="body2" color="text.secondary">
                    {completed
                      ? ""
                      : t("pages.signInConfirm.requestAgainAfter", {
                          seconds: `${String(minutes).padStart(
                            2,
                            "0"
                          )}:${String(seconds).padStart(2, "0")}`,
                        })}
                  </Typography>

                  <Button
                    color="warning"
                    variant="outlined"
                    onClick={handleClickOnSendAgain}
                    disabled={!completed}
                  >
                    {t("common.buttons.sendAgain")}
                  </Button>
                </Stack>
              )}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default VerifyEmail;
