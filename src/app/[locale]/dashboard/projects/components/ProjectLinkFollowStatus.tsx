import { Chip } from "@mui/material";
import LinkFollowMapper from "./mapper/linkFollowMapper";
import { ProjectLinkFollowEnum } from "@/services/projects/types";

interface ProjectLinkFollowStatusProps {
  status: ProjectLinkFollowEnum;
}

const ProjectLinkFollowStatus = ({ status }: ProjectLinkFollowStatusProps) => {
  const statusMapper = LinkFollowMapper();
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

export default ProjectLinkFollowStatus;
