import { ProjectLinkScanEnum } from "@/services/projects/types";
import { Inventory, PendingActions } from "@mui/icons-material";
import { ReactNode } from "react";

const LinkScanMapper = () => {
  const mapper: Partial<
    Record<
      ProjectLinkScanEnum,
      {
        title: string;
        bg: string;
        text: string;
        icon: ReactNode;
      }
    >
  > = {
    [ProjectLinkScanEnum.Scanned]: {
      title: "Scanned",
      bg: "#F3F8CA",
      text: "#234F18",
      icon: <PendingActions fontSize="small" />,
    },
    [ProjectLinkScanEnum.NotScanned]: {
      title: "Blocked",
      bg: "orange.900",
      text: "white",
      icon: <Inventory fontSize="small" />,
    },
  };

  return mapper;
};

export default LinkScanMapper;
