"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { IBacklinkProject } from "@/services/projects/types";
import { Paper } from "@mui/material";
import { FC, useState } from "react";
import ProjectOperations from "../ProjectOperations";
import ProjectsSearch from "../ProjectsSearch";
import { ProjectsColumns } from "./ProjectsColumns";
import EditLinkDialog from "../dialogs/EditLinkDialog";
import { useQueryClient } from "@tanstack/react-query";
import { GET_PROJECTS_LIST } from "../../hooks/useGetProjects";
import { queryClient } from "@/providers/TanstackProvider";

type ProjectsTableProps = {
  data: IBacklinkProject[];
};

const ProjectsTable: FC<ProjectsTableProps> = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  const queryClient = useQueryClient();

  const handleEditClick = (projectId: number) => {
    setSelectedProject(projectId);
    setOpenDialog(true);
  };

  const handleEditUserDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const onSuccessOperation = () => {
    queryClient.invalidateQueries({ queryKey: [GET_PROJECTS_LIST] });
  };

  const columns = ProjectsColumns(handleEditClick);

  const { table } = useDataTable({
    data: data,
    columns: columns,
    pageCount: data.length,
    shallow: false,
  });

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          mt: 8,
        }}
      >
        <ProjectsSearch />
        <ProjectOperations />
      </Paper>
      <DataTable table={table}></DataTable>

      <EditLinkDialog
        open={openDialog}
        projectId={selectedProject}
        onClose={handleEditUserDialog}
        onSuccess={onSuccessOperation}
      />
    </>
  );
};

export default ProjectsTable;
