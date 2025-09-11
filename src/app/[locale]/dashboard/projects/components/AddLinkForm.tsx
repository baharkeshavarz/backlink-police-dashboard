"use client";

import { ButtonWithLoading } from "@/components/ButtonWithLoading";
import { FormBuilder, Option } from "@/components/Fields";
import { FormBuilderProps } from "@/components/Fields/components/FormBuilder";
import { onInvalidSubmit } from "@/utils/form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import AddLinkFormSkeleton from "./AddLinkFormSkeleton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { IAddProjectLinkPayload } from "@/services/projects/types";
import { addProjectLink } from "@/services/projects";
import useGetUsers from "../../users/hooks/useGetUsers";

type AddLinkFormProps = {
  onSuccess: VoidFunction;
};

type AddProjectLinkPayload = Omit<
  IAddProjectLinkPayload,
  "projectId" | "setActivity"
>;

const AddLinkForm: FC<AddLinkFormProps> = ({ onSuccess }) => {
  const t = useTranslations();
  const { data: users } = useGetUsers({});
  const usersOptions =
    users &&
    users?.items?.map((item) => {
      return {
        id: item.id,
        label: item?.firstName
          ? `${item?.firstName} ${item?.lastName}`
          : item?.email,
        value: item.id,
      } as Option;
    });

  const labels: Record<keyof AddProjectLinkPayload, string> = {
    userId: "User",
    anchorKeyWord: "Anchor Keyword",
    publisherUrl: "Publisher URL",
    backLinkUrl: "Backlink URL",
    cost: "Cost",
    purchasedOn: "Purchased On",
  };

  const resolveSchema: yup.ObjectSchema<AddProjectLinkPayload> = yup.object({
    userId: yup.string().required().label(labels.anchorKeyWord),
    anchorKeyWord: yup.string().required().label(labels.userId),
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
    userId: {
      name: "userId",
      label: labels.userId,
      type: "SearchableSelective",
      options: usersOptions || [],
      ui: { grid: { size: { xs: 12 } } },
    },
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
        {isPending ? (
          <AddLinkFormSkeleton />
        ) : (
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
        )}
      </Box>
    </FormProvider>
  );
};

export default AddLinkForm;
