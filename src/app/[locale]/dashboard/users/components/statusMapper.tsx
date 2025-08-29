import { UserStatusEnum } from "@/services/users/types";
import { Inventory, PendingActions } from "@mui/icons-material";
import { green, orange } from "@mui/material/colors";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

const StatusMapper = () => {
  const t = useTranslations();
  const mapper: Partial<
    Record<
      UserStatusEnum,
      {
        title: string;
        bg: string;
        text: string;
        icon: ReactNode;
      }
    >
  > = {
    [UserStatusEnum.Online]: {
      title: t("pages.users.status.online"),
      bg: "#458A26",
      text: green[900],
      icon: <PendingActions fontSize="small" />,
    },
    [UserStatusEnum.Offline]: {
      title: t("pages.users.status.offline"),
      bg: "#F05252",
      text: orange[900],
      icon: <Inventory fontSize="small" />,
    },
  };

  return mapper;
};

export default StatusMapper;
