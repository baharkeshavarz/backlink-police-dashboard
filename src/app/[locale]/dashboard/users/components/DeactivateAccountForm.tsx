import { ButtonWithLoadingText } from "@/components/ButtonWithLoading";
import { FormBuilder, Option } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { deActivateUser } from "@/services/users";
import { IDeactivateUserPayload } from "@/services/users/types";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import useGetUserDetails from "../hooks/useGetUserDetails";

type DeactivateAccountFormProps = {
  userId: string;
  onSuccess?: VoidFunction;
};
type DeactivateUserPayload = Omit<IDeactivateUserPayload, "userId">;

const DeactivateAccountForm: FC<DeactivateAccountFormProps> = ({
  userId,
  onSuccess,
}) => {
  const { data: userProfile } = useGetUserDetails({ userId });

  const labels: Record<keyof DeactivateUserPayload, string> = {
    reason: "Specify the reason of deactivation:",
    description: "description",
  };

  const resolveSchema: yup.ObjectSchema<DeactivateUserPayload> = yup.object({
    reason: yup.string().required().required().label(labels.reason),
    description: yup.string().required().required().label(labels.description),
  });

  const methods = useForm<DeactivateUserPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deActivateUser,
  });

  const onSubmit: SubmitHandler<DeactivateUserPayload> = async (payload) => {
    const newPaylod = { ...payload, userId };
    const { status } = await mutateAsync({ params: newPaylod });
    if (status === HttpStatusCode.Ok) {
      onSuccess?.();
    }
  };

  const reasonsOption: Option[] = [
    {
      id: 1,
      label: "Invalid credit card",
      value: "Invalid credit card",
    },
    {
      id: 2,
      label: "Unauthorized usage",
      value: "Unauthorized usage",
    },
    {
      id: 3,
      label: "Other",
      value: "Other",
    },
  ];

  const fields: FormBuilderProps["fields"] = {
    reason: {
      name: "reason",
      label: labels.reason,
      type: "RadioButtons",
      options: reasonsOption,
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    description: {
      name: "description",
      label: "",
      type: "String",
      props: {
        placeholder: "Specify the reason...",
        multiline: true,
        rows: 4,
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
        width="100%"
        mb={5}
      >
        <Avatar
          alt=""
          src={
            userProfile?.imageUrl || `${DEFAULT_DASHBOARD_ICONS}/user-icon.png`
          }
          sx={{ width: 48, height: 48 }}
        />
        <Stack>
          <Typography variant="subtitle1" fontWeight="600">
            {userProfile?.firstName} {userProfile?.lastName}
          </Typography>
          <Typography variant="subtitle2" fontWeight="400" color="grey.600">
            {userProfile?.email}
          </Typography>
        </Stack>
      </Box>

      <FormProvider {...methods}>
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        >
          <FormBuilder fields={fields} />

          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <Typography fontSize="10px" fontWeight={500} color="grey.500">
                0/50 Characters
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              mt={1}
            >
              <ButtonWithLoadingText
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "197px", height: "44px" }}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  Discard
                </Typography>
              </ButtonWithLoadingText>
              <ButtonWithLoadingText
                disabled={isPending}
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ width: "197px", height: "44px" }}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  Deactivate Account
                </Typography>
              </ButtonWithLoadingText>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default DeactivateAccountForm;
