import { Chip } from "@mui/material";
import { ProjectLinkScanEnum } from "@/services/projects/types";
import LinkScanMapper from "./mapper/linkScanMapper";

interface ProjectLinkScanStatusProps {
  status: ProjectLinkScanEnum;
}

const ProjectLinkScanStatus = ({ status }: ProjectLinkScanStatusProps) => {
  const statusMapper = LinkScanMapper();
  const linkStatus = statusMapper[status];
  if (!linkStatus) return null;

  return (
    <Chip
      label={linkStatus.title}
      size="medium"
      sx={{
        borderRadius: "6px",
        fontWeight: 500,
        fontSize: 12,
        bgcolor: linkStatus.bg,
        color: linkStatus.text,
      }}
    />
  );
};

export default ProjectLinkScanStatus;
