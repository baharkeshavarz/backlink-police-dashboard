"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { FormBuilder } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { IAddProjectLinkPayload } from "@/services/projects/types";
import { addProjectLink } from "@/services/projects";

type AddLinkFormProps = {
  onSuccess: VoidFunction;
};

type AddProjectLinkPayload = Omit<
  IAddProjectLinkPayload,
  "userId" | "projectId" | "setActivity"
>;

const AddLinkForm: FC<AddLinkFormProps> = ({ onSuccess }) => {
  const t = useTranslations();
  const labels: Record<keyof AddProjectLinkPayload, string> = {
    anchorKeyWord: "Anchor Keyword",
    publisherUrl: "Publisher URL",
    backLinkUrl: "Backlink URL",
    cost: "Cost",
    purchasedOn: "Purchased On",
  };

  const resolveSchema: yup.ObjectSchema<AddProjectLinkPayload> = yup.object({
    anchorKeyWord: yup.string().required().label(labels.anchorKeyWord),
    backLinkUrl: yup.string().required().label(labels.backLinkUrl),
    publisherUrl: yup.string().required().label(labels.publisherUrl),
    cost: yup.number().required().typeError(`${labels.cost} must be a number`),
    purchasedOn: yup.string().required().label(labels.purchasedOn),
  });

  const methods = useForm<AddProjectLinkPayload>({
    resolver: yupResolver(resolveSchema),
  });

  const { handleSubmit } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addProjectLink,
  });

  const onSubmit: SubmitHandler<AddProjectLinkPayload> = async (payload) => {
    const linkPayload: IAddProjectLinkPayload = {
      ...payload,
      userId: "01992b04-a71d-7dd6-8c07-f78fe56c0510", //TODO: get user id from context
      setActivity: true,
    };
    const { data, status } = await mutateAsync({ payload: linkPayload });
    if (status === HttpStatusCode.Ok) {
      toast.success(data as string);
      onSuccess?.();
    } else {
      toast.error(t("messages.somethingWentWrong"));
    }
  };

  const fields: FormBuilderProps["fields"] = {
    anchorKeyWord: {
      name: "anchorKeyWord",
      label: labels.anchorKeyWord,
      type: "String",
      props: {
        placeholder: "AnchorKe yWord",
      },
      ui: {
        grid: {
          size: { xs: 12 },
        },
      },
    },
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
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}>
        <Grid container spacing={2}>
          <FormBuilder fields={fields} />
          <Grid size={{ xs: 12 }}>
            <ButtonWithLoading
              isLoading={isPending}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: "117px", height: "41px" }}
            >
              <Typography variant="subtitle2">Save</Typography>
            </ButtonWithLoading>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default AddLinkForm;
