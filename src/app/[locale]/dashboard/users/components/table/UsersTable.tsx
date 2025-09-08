"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { IUser } from "@/services/users/types";
import { Paper } from "@mui/material";
import { FC, useState } from "react";
import UsersSearch from "../../../components/UsersSearch";
import EditUserDialog from "../dialogs/EditUserDialog";
import UserOperation from "../UserOperations";
import UserListLastVisit from "./UserListLastVisit";
import { UsersColumns } from "./UsersColumns";

type UsersTableProps = {
  data: IUser[];
};

const UsersTable: FC<UsersTableProps> = ({ data }) => {
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
        <UsersSearch />
        <UserOperation />
      </Paper>
      <DataTable table={table} extraInfo={<UserListLastVisit />}></DataTable>

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
