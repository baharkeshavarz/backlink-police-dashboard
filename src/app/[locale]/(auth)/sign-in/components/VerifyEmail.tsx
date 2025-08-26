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
const codeLength = 5;

const VerifyEmail = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timerEndDate, setTimerEndDate] = useState(
    Date.now() + RESEND_AUTH_TIMER * 1000
  );

  const userName = searchParams.get("username") || "sample@backlink.com"; //todo
  const labels: Record<keyof FieldNames, string> = {
    password: t("pages.signInConfirm.wrongCode", { count: codeLength }),
  };

  const resolveSchema: yup.ObjectSchema<FieldNames> = yup.object({
    password: yup
      .string()
      .nullable()
      .required()
      .min(codeLength)
      .label(labels.password),
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
    // await mutateAsync(payload);
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
  }, [password, handleSubmit, onSubmit]);

  // const { mutateAsync: mutateAsyncSendAgain, isPending: isPendingSendAgain } =
  //   useMutation({
  //     mutationFn: sendLoginOtp,
  //   });

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
          <Stack>
            <Typography variant="h1" fontWeight={700}>
              {t("pages.signInConfirm.checkEmail")}
            </Typography>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignContent="center"
              sx={{ pt: 2 }}
            >
              <Typography variant="body1" color="grey.700">
                {t("pages.signInConfirm.enterCodeMessage")}
              </Typography>
              <Typography variant="body1" fontWeight={700}>
                {userName}
              </Typography>
            </Box>
            <Typography variant="body1" color="grey.700">
              {t("pages.signInConfirm.enterCode")}
            </Typography>
            <Box mt={3}>
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
                          width: 74,
                          height: 72,
                          marginRight: 8,
                          borderRadius: 8,
                          boxShadow: "none",
                          outlineWidth: 0,
                          border: "1px solid",
                          borderColor: error?.message ? red[500] : grey[300],
                          textAlign: "center",
                          fontSize: 30,
                          fontWeight: 800,
                        }}
                        value={value}
                        onChange={(value) => {
                          onChange(digitsFaToEn(value));
                        }}
                        numInputs={codeLength}
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
                <Box width="100%">
                  {completed ? (
                    ""
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="flex-start"
                      alignContent="center"
                      gap={1}
                    >
                      <Typography variant="body1" color="grey.700">
                        {t("pages.signInConfirm.requestAgainAfter")}
                      </Typography>
                      <Typography variant="body1" fontWeight={700}>
                        {`${String(minutes).padStart(2, "0")}:${String(
                          seconds
                        ).padStart(2, "0")}`}
                      </Typography>
                    </Box>
                  )}

                  <Button
                    variant="outlined"
                    onClick={handleClickOnSendAgain}
                    disabled={!completed}
                    fullWidth
                    sx={{ mt: 2, bgcolor: "grey.200", color: "grey.600" }}
                  >
                    {t("common.buttons.sendAgain")}
                  </Button>
                </Box>
              )}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};
export default VerifyEmail;
