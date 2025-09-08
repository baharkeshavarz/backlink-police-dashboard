"use client";

import { ButtonWithLoadingText } from "@/components/ButtonWithLoading";
import { useAppContext } from "@/hooks/useAppContext";
import { Link, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

const CheckTermsRulesForm = () => {
  const t = useTranslations();
  const { isMobile } = useAppContext();
  const form = useFormContext();

  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Stack spacing={1}>
      <Box sx={{ mt: 1 }}>
        <Controller
          name="terms"
          control={control}
          rules={{ required: "You must accept the Terms of Service" }}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  color="primary"
                  onChange={(e) => field.onChange(e.target.checked)}
                />
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
        {errors?.terms && (
          <FormHelperText error>
            {errors?.terms?.message?.toString()}
          </FormHelperText>
        )}
      </Box>

      <ButtonWithLoadingText
        isLoading={isSubmitting}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
      >
        <Typography variant="subtitle2">
          {t("pages.resetPassword.resetButton")}
        </Typography>
      </ButtonWithLoadingText>
    </Stack>
  );
};

export default CheckTermsRulesForm;
