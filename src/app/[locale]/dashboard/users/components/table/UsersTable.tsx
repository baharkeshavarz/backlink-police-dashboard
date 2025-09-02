"use client";

import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { IUser } from "@/services/users/types";
import { UsersColumns } from "./UsersColumns";
import UsersSearch from "../../../components/UsersSearch";
import { Paper } from "@mui/material";
import UserOperation from "../UserOperation";
import AddUserDialog from "../AddUserDialog";
import { useState } from "react";

type Props = {
  data: IUser[];
};

export default function UsersTable({ data }: Props) {
  const { table } = useDataTable({
    data: data,
    columns: UsersColumns,
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
      <DataTable table={table}></DataTable>
    </>
  );
}
