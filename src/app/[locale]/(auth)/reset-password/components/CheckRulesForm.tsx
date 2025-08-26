"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { useAppContext } from "@/hooks/useAppContext";
import { Link, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  acceptClubRule: boolean;
};

const CheckClubRulesForm = ({
  onSubmitFunc = () => {},
}: {
  onSubmitFunc?: () => void;
}) => {
  const t = useTranslations();
  const { isMobile } = useAppContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      acceptClubRule: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.acceptClubRule) {
      onSubmitFunc();
    }
  };

  const handleStart = () => {};

  return (
    <Stack spacing={1}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
        <Controller
          name="acceptClubRule"
          control={control}
          rules={{ required: "You must accept the Terms of Service" }}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox {...field} checked={!!field.value} color="primary" />
              }
              label={
                <Typography
                  fontSize={isMobile ? "14px" : "16px"}
                  fontWeight={600}
                  color="grey.500"
                >
                  {t.rich("messages.terms", {
                    terms: (chunks) => (
                      <Link
                        href="/terms-conditions"
                        underline="hover"
                        target="_blank"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </Typography>
              }
            />
          )}
        />
        {errors?.acceptClubRule && (
          <FormHelperText error>{errors.acceptClubRule.message}</FormHelperText>
        )}
      </Box>
      <ButtonWithLoading variant="contained" onClick={handleStart}>
        <Typography variant="subtitle2">
          {t("pages.resetPassword.resetButton")}
        </Typography>
      </ButtonWithLoading>
    </Stack>
  );
};

export default CheckClubRulesForm;
