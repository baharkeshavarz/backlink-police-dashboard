"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Paper } from "@mui/material";
import { useState } from "react";
import UsersSearch from "../../../components/UsersSearch";
import EditUserDialog from "../dialogs/EditUserDialog";
import UserOperation from "../UserOperations";
import UserListLastVisit from "./UserListLastVisit";
import { UsersColumns } from "./UsersColumns";
import UsersSkeleton from "../UsersSkeleton";
import useGetUsers from "../../hooks/useGetUsers";
import useBaseFilters from "../../../hooks/useBaseFilters";

const UsersTable = () => {
  const filters = useBaseFilters();
  const { data, isLoading } = useGetUsers({
    filters,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const handleEditClick = (userId: string) => {
    setSelectedUser(userId);
    setOpenDialog(true);
  };

  const handleEditUserDialog = () => {
    setOpenDialog((prev) => !prev);
  };

  const columns = UsersColumns(handleEditClick);
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
          mt: 8,
        }}
      >
        <UsersSearch />
        <UserOperation />
      </Paper>
      {isLoading ? (
        <UsersSkeleton />
      ) : (
        <DataTable table={table} extraInfo={<UserListLastVisit />}></DataTable>
      )}
      <EditUserDialog
        open={openDialog}
        userId={selectedUser}
        onClose={handleEditUserDialog}
        onSuccess={handleEditUserDialog}
      />
    </>
  );
};

export default UsersTable;
