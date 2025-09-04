"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { IBacklinkProject } from "@/services/projects/types";
import { Paper } from "@mui/material";
import { FC, useState } from "react";
import EditUserDialog from "../dialogs/EditUserDialog";
import ProjectOperations from "../ProjectOperations";
import ProjectsSearch from "../ProjectsSearch";
import { ProjectsColumns } from "./ProjectsColumns";

type ProjectsTableProps = {
  data: IBacklinkProject[];
};

const ProjectsTable: FC<ProjectsTableProps> = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const handleEditClick = (userId: string) => {
    setSelectedUser(userId);
    setOpenDialog(true);
  };

  const handleEditUserDialog = () => {
    setOpenDialog((prev) => !prev);
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

      <EditUserDialog
        open={openDialog}
        userId={selectedUser}
        onClose={handleEditUserDialog}
        onSuccess={handleEditUserDialog}
      />
    </>
  );
};

export default ProjectsTable;
