import { ProjectLinkStatusEnum } from "@/services/projects/types";
import { Inventory, PendingActions } from "@mui/icons-material";
import { ReactNode } from "react";

const LinkStatusMapper = () => {
  const mapper: Partial<
    Record<
      ProjectLinkStatusEnum,
      {
        title: string;
        bg: string;
        text: string;
        icon: ReactNode;
      }
    >
  > = {
    [ProjectLinkStatusEnum.Active]: {
      title: "Active",
      bg: "#F3F8CA",
      text: "#234F18",
      icon: <PendingActions fontSize="small" />,
    },
    [ProjectLinkStatusEnum.InActive]: {
      title: "InActive",
      bg: "orange.900",
      text: "white",
      icon: <Inventory fontSize="small" />,
    },
  };

  return mapper;
};

export default LinkStatusMapper;
