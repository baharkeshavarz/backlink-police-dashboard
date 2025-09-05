import { Chip } from "@mui/material";
import LinkStatusMapper from "./mapper/linkStatusMapper";
import { ProjectLinkStatusEnum } from "@/services/projects/types";

interface ProjectLinkStatusProps {
  status: ProjectLinkStatusEnum;
}

const ProjectLinkStatus = ({ status }: ProjectLinkStatusProps) => {
  const statusMapper = LinkStatusMapper();
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

export default ProjectLinkStatus;
