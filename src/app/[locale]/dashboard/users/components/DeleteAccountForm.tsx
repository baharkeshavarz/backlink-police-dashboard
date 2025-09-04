import { ButtonWithLoadingText } from "@/components/ButtonWithLoading";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

type DeleteAccountFormProps = {
  userId: string;
  onSuccess?: VoidFunction;
};
type DeleteAccountPayload = { delete: string };

const DeleteAccountForm: FC<DeleteAccountFormProps> = ({
  userId,
  onSuccess,
}) => {
  const t = useTranslations();

  const labels = {
    delete: "delete",
  };

  const resolveSchema: yup.ObjectSchema<DeleteAccountPayload> = yup.object({
    delete: yup.string().required().required().label(labels.delete),
  });

  const methods = useForm<DeleteAccountPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<DeleteAccountPayload> = async (payload) => {
    console.log(payload);
  };

  const fields: FormBuilderProps["fields"] = {
    delete: {
      name: "delete",
      label: "Type “DELETE” in the field below to confirm",
      type: "String",
      props: {
        placeholder: "DELETE",
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
          src={`${DEFAULT_DASHBOARD_ICONS}/user-test.jpg`}
          sx={{ width: 48, height: 48 }}
        />
        <Stack>
          <Typography variant="subtitle1" fontWeight="600">
            Kyle Mani
          </Typography>
          <Typography variant="subtitle2" fontWeight="400" color="grey.600">
            Kyle@owdt.com
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
          <Grid size={{ xs: 12 }}>
            <Stack>
              <Typography variant="h3" fontWeight={700} color="grey.900">
                Deleting account will do the following:
              </Typography>
              <Typography variant="subtitle1" color="#F05252" my={2}>
                Account deletion is final. There will be no way to restore this
                account.
              </Typography>
            </Stack>
          </Grid>
          <FormBuilder fields={fields} />

          <Grid size={{ xs: 12 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={1}
              mt={1}
            >
              <ButtonWithLoadingText
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "134px", height: "41px" }}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  Keep Account
                </Typography>
              </ButtonWithLoadingText>
              <ButtonWithLoadingText
                type="submit"
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<Trash2 />}
                sx={{ width: "228px", height: "41px" }}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  Delete Account Anyway
                </Typography>
              </ButtonWithLoadingText>
            </Box>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};

export default DeleteAccountForm;
