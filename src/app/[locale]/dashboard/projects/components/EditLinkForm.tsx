"use client";

import {
  ButtonWithLoading,
  ButtonWithLoadingText,
} from "@/components/ButtonWithLoading";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { getProjectLink, updateProjectLink } from "@/services/projects";
import {
  IAddProjectLinkPayload,
  IUpdateProjectLinkPayload,
} from "@/services/projects/types";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import EditLinkFormSkeleton from "./EditLinkFormSkeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

type EditLinkFormProps = {
  projectId: number;
  onSuccess?: VoidFunction;
  onClose?: VoidFunction;
};

type AddProjectLinkPayload = Omit<
  IAddProjectLinkPayload,
  "userId" | "projectId" | "setActivity" | "anchorKeyWord"
>;

const EditLinkForm: FC<EditLinkFormProps> = ({
  projectId,
  onSuccess,
  onClose,
}) => {
  const t = useTranslations();

  const { isFetching } = useQuery({
    enabled: !!projectId,
    queryKey: ["GET_PROJECT_LINK", projectId],
    queryFn: async () => {
      const { data } = await getProjectLink({ id: projectId });

      form.reset({ ...data });
      return data;
    },
  });

  const labels: Record<keyof AddProjectLinkPayload, string> = {
    publisherUrl: "Destination URL",
    backLinkUrl: "Backlink URL",
    cost: "Cost",
    purchasedOn: "Purchased On",
  };

  const resolveSchema: yup.ObjectSchema<AddProjectLinkPayload> = yup.object({
    backLinkUrl: yup.string().required().label(labels.backLinkUrl),
    publisherUrl: yup.string().required().label(labels.publisherUrl),
    cost: yup.number().required().typeError(`${labels.cost} must be a number`),
    purchasedOn: yup.string().required().label(labels.purchasedOn),
  });

  const form = useForm<AddProjectLinkPayload>({
    resolver: yupResolver(resolveSchema),
    defaultValues: {},
  });

  const { handleSubmit } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateProjectLink,
  });

  const onSubmit: SubmitHandler<AddProjectLinkPayload> = async (payload) => {
    const linkPayload: IUpdateProjectLinkPayload = {
      ...payload,
      id: projectId,
    };

    const { data, status } = await mutateAsync({ payload: linkPayload });
    if (status === HttpStatusCode.Ok) {
      toast.success(data as string);
      onSuccess?.();
      onClose?.();
    } else {
      toast.error(t("messages.somethingWentWrong"));
    }
  };

  const fields: FormBuilderProps["fields"] = {
    publisherUrl: {
      name: "publisherUrl",
      label: labels.publisherUrl,
      type: "String",
      props: {
        placeholder: "Insert Link",
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    backLinkUrl: {
      name: "backLinkUrl",
      label: labels.backLinkUrl,
      type: "String",
      props: {
        placeholder: "Insert Link",
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    cost: {
      name: "cost",
      label: labels.cost,
      type: "String",
      props: {
        placeholder: "$",
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
    purchasedOn: {
      name: "purchasedOn",
      label: labels.purchasedOn,
      type: "String",
      props: {
        placeholder: "Insert vendor",
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
  };

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
        {isFetching ? (
          <EditLinkFormSkeleton />
        ) : (
          <Grid container spacing={1.5}>
            <FormBuilder fields={fields} />
            <Grid size={{ xs: 12 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
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
                <ButtonWithLoadingText
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  startIcon={<Trash2 />}
                  sx={{ width: "112px", height: "41px" }}
                >
                  <Typography variant="subtitle2" fontWeight={500}>
                    Delete
                  </Typography>
                </ButtonWithLoadingText>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </FormProvider>
  );
};

export default EditLinkForm;
