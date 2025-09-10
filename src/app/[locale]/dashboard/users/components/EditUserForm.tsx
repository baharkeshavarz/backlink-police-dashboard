"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

import * as yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUser, updateUser } from "@/services/users";
import { IEditUserPayload } from "@/services/users/types";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { FC } from "react";
import Image from "next/image";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import useGetCountries from "@/hooks/useGetCountries";
import { DEFAULT_DASHBOARD_USERS_PATH } from "@/constants/routes";

type EditUserFormProps = {
  userId: string;
  onSuccess?: VoidFunction;
  editType?: "EDIT" | "GENERAL";
};

const EditUserForm: FC<EditUserFormProps> = ({
  userId,
  onSuccess,
  editType,
}) => {
  const t = useTranslations();
  const { data: countries } = useGetCountries();

  const { isFetching } = useQuery({
    enabled: !!userId,
    queryKey: ["GET_USER", userId],
    queryFn: async () => {
      const { data } = await getUser({ id: userId });

      form.reset({ ...data });
      return data;
    },
    gcTime: 0,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolveSchema: yup.ObjectSchema<any> = yup.object({
    firstName: yup.string().required().label(labels.firstName),
    lastName: yup.string().required().label(labels.lastName),
    address: yup.string().required().label(labels.address),
    birthDate: yup.mixed().nullable().label(labels.birthDate),
    city: yup.string().required().label(labels.city),
    countryId: yup.number().required().label(labels.countryId),
    email: yup.string().required().label(labels.email),
    organization: yup.string().required().label(labels.organization),
    phoneNumber: yup
      .string()
      .required()
      .matches(/^\+?\d+$/, "Invalid phone number")
      .label(labels.phoneNumber),
    role: yup.string().required().label(labels.role),
    zip: yup.string().required().label(labels.zip),
    department: yup.string().required().label(labels.department),
  });

  const form = useForm<Partial<IEditUserPayload>>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {},
  });

  const { handleSubmit } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
  });

  const onSubmit: SubmitHandler<Partial<IEditUserPayload>> = async (
    payload
  ) => {
    const formData: Partial<IEditUserPayload> & { id: string } = {
      id: userId,
      ...payload,
    };
    const { data, status } = await mutateAsync({ params: formData });
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
      type: "SearchableSelective",
      options: countries || [],
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
    zip: {
      name: "zip",
      label: labels.zip,
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
  };

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
        <Grid container spacing={1.5}>
          <FormBuilder fields={fields} />
          {editType === "EDIT" && (
            <Grid size={{ xs: 12 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Button
                  variant="outlined"
                  size="medium"
                  component={Link}
                  href={`${DEFAULT_DASHBOARD_USERS_PATH}/${userId}`}
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
          )}

          {editType === "GENERAL" && (
            <Grid size={{ xs: 12 }}>
              <Box display="flex" alignItems="center" gap={2}>
                <ButtonWithLoading
                  variant="outlined"
                  isLoading={isFetching || isPending}
                  type="submit"
                  startIcon={
                    <Image
                      alt="edit"
                      src={`${DEFAULT_DASHBOARD_ICONS}pencil-alt.png`}
                      width={16}
                      height={16}
                    />
                  }
                >
                  <Typography variant="subtitle2">Edit</Typography>
                </ButtonWithLoading>
                <ButtonWithLoading
                  type="submit"
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{
                    width: "92px",
                    height: "41px",
                    bgcolor: "grey.50",
                    color: "grey.500",
                    "&:hover": {
                      bgcolor: "blue.400",
                    },
                  }}
                >
                  <Typography variant="subtitle2" color="grey.500">
                    Save all
                  </Typography>
                </ButtonWithLoading>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default EditUserForm;
