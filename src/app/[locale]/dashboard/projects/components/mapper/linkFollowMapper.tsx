import { ProjectLinkFollowEnum } from "@/services/projects/types";
import { Inventory, PendingActions } from "@mui/icons-material";
import { ReactNode } from "react";

const LinkFollowMapper = () => {
  const mapper: Partial<
    Record<
      ProjectLinkFollowEnum,
      {
        title: string;
        bg: string;
        text: string;
        icon: ReactNode;
      }
    >
  > = {
    [ProjectLinkFollowEnum.DoFollow]: {
      title: "Do-Follow",
      bg: "#F3F8CA",
      text: "#234F18",
      icon: <PendingActions fontSize="small" />,
    },
    [ProjectLinkFollowEnum.NoFollow]: {
      title: "No-Follow",
      bg: "orange.900",
      text: "white",
      icon: <Inventory fontSize="small" />,
    },
  };

  return mapper;
};

export default LinkFollowMapper;
