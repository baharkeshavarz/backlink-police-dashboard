"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { UsersColumns } from "./UsersColumns";
import { DataTable } from "@/components/data-table/data-table";
import { IUser } from "@/services/users/types";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Box } from "@mui/material";

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
    <Box width="100%">
      <DataTable table={table}></DataTable>
    </Box>
  );
}
