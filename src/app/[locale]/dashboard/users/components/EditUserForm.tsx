"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updaateUser } from "@/services/users";
import { IEditUserPayload } from "@/services/users/types";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { FC } from "react";

type EditUserFormProps = {
  userId: string;
  onSuccess?: VoidFunction;
};

const EditUserForm: FC<EditUserFormProps> = ({ userId, onSuccess }) => {
  const t = useTranslations();

  const { isFetching } = useQuery({
    enabled: !!userId,
    queryKey: ["GET_USER", userId],
    queryFn: async () => {
      const { data } = await getUser({ id: userId });

      form.reset({ ...data });
      return data;
    },
  });

  const labels: Record<keyof IEditUserPayload, string> = {
    firstName: "First Name",
    lastName: "Last Name",
    address: "Address",
    birthDate: "BirthDate",
    city: "City",
    countryId: "Country",
    department: "Department",
    email: "Email",
    organization: "Organization",
    phoneNumber: "Phone Number ",
    role: "Role",
    zip: "Zip/Postal code",
  };

  const resolveSchema: yup.ObjectSchema<IEditUserPayload> = yup.object({
    firstName: yup.string().required().label(labels.firstName),
    lastName: yup.string().required().label(labels.lastName),
    address: yup.string().required().label(labels.address),
    birthDate: yup.string().required().label(labels.birthDate),
    city: yup.string().required().label(labels.city),
    countryId: yup.number().required().label(labels.countryId),
    email: yup.string().required().label(labels.email),
    organization: yup.string().required().label(labels.organization),
    phoneNumber: yup.string().required().label(labels.phoneNumber),
    role: yup.string().required().label(labels.role),
    zip: yup.string().required().label(labels.zip),
    department: yup.string().required().label(labels.department),
  });

  const form = useForm<IEditUserPayload>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {},
  });

  const { handleSubmit } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updaateUser,
  });

  const onSubmit: SubmitHandler<IEditUserPayload> = async (payload) => {
    const formData: IEditUserPayload & { id: string } = {
      id: userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      address: payload?.address || "",
      birthDate: payload?.birthDate || "",
      city: payload?.city || "",
      countryId: payload.countryId,
      department: payload?.department || "",
      email: payload.email,
      organization: payload?.organization || "",
      phoneNumber: payload?.phoneNumber || "",
      role: payload?.role || "",
      zip: payload?.zip || "",
    };
    console.log(formData);
    const { data, status } = await mutateAsync({ payload: formData });
    if (status === HttpStatusCode.Ok) {
      toast.success(data as string);
      onSuccess?.();
    } else {
      toast.error(t("messages.somethingWentWrong"));
    }
  };

  const fields: FormBuilderProps["fields"] = {
    firstName: {
      name: "firstName",
      label: labels.firstName,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    lastName: {
      name: "lastName",
      label: labels.lastName,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    countryId: {
      name: "countryId",
      label: labels.countryId,
      type: "Number",
      ui: { grid: { size: { xs: 6 } } },
    },
    city: {
      name: "city",
      label: labels.city,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    address: {
      name: "address",
      label: labels.address,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    email: {
      name: "email",
      label: labels.email,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    phoneNumber: {
      name: "phoneNumber",
      label: labels.phoneNumber,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    birthDate: {
      name: "birthDate",
      label: labels.birthDate,
      type: "Date",
      ui: { grid: { size: { xs: 6 } } },
    },
    organization: {
      name: "organization",
      label: labels.organization,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    role: {
      name: "role",
      label: labels.role,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    department: {
      name: "department",
      label: labels.department,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
    zip: {
      name: "zip",
      label: labels.zip,
      type: "String",
      ui: { grid: { size: { xs: 6 } } },
    },
  };

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
        <Grid container spacing={1.5}>
          <FormBuilder fields={fields} />
          <Grid size={{ xs: 12 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                variant="outlined"
                size="medium"
                sx={{ width: "179px", height: "41px" }}
              >
                <Typography variant="subtitle2">
                  View Detailed Profile
                </Typography>
              </Button>
              <ButtonWithLoading
                isLoading={isFetching || isPending}
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                sx={{ width: "73px", height: "41px" }}
              >
                <Typography variant="subtitle2">Save</Typography>
              </ButtonWithLoading>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default EditUserForm;
