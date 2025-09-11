"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Paper } from "@mui/material";
import { useState } from "react";
import ProjectOperations from "../ProjectOperations";
import ProjectsSearch from "../ProjectsSearch";
import { ProjectsColumns } from "./ProjectsColumns";
import EditLinkDialog from "../dialogs/EditLinkDialog";
import { useQueryClient } from "@tanstack/react-query";
import useGetProjects, { GET_PROJECTS_LIST } from "../../hooks/useGetProjects";
import ProjectsSkeleton from "../ProjectsSkeleton";
import useBaseFilters from "../../../hooks/useBaseFilters";

const ProjectsTable = () => {
  const filters = useBaseFilters();
  const { data, isLoading } = useGetProjects({
    filters,
  });

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

  const totalCount = data?.totalCount ?? data?.items?.length ?? 0;
  const { table } = useDataTable({
    data: data?.items || [],
    columns: columns,
    pageCount: Math.ceil(totalCount / (filters?.size || 10)),
    shallow: false,
    meta: { totalCount },
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
          mt: 2,
        }}
      >
        <ProjectsSearch />
        <ProjectOperations />
      </Paper>
      {isLoading ? <ProjectsSkeleton /> : <DataTable table={table}></DataTable>}
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
