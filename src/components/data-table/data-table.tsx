import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";

interface DataTableProps<TData> extends React.ComponentProps<"div"> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  emptyState?: React.ReactNode;
  showBodyBorder?: boolean;
  showRowBorders?: boolean;
  bodyClassName?: string;
  headerBackgroundColor?: string;
  enableAlternatingRowColors?: boolean;
  alternatingRowColor?: string;
}

export function DataTable<TData>({
  table,
  actionBar,
  emptyState,
  children,
  showRowBorders = true,
  showBodyBorder = false,
  headerBackgroundColor,
  enableAlternatingRowColors,
  alternatingRowColor,
  ...props
}: DataTableProps<TData>) {
  return (
    <Box display="flex" flexDirection="column" gap={2} {...props}>
      {children}
      <Box>
        <Table
          sx={{
            border: showBodyBorder ? "1px solid" : "none",
            borderColor: "divider",
          }}
        >
          {/* Header */}
          <TableHead
            sx={{
              backgroundColor: headerBackgroundColor || "grey.100",
              "& th": {
                borderBottom: "1px solid",
                borderColor: "divider",
                fontSize: 14,
                color: "grey.600",
                fontWeight: 600,
              },
            }}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          {/* Body */}
          <TableBody
            sx={{
              "& tr:nth-of-type(odd)": enableAlternatingRowColors
                ? {
                    backgroundColor: alternatingRowColor || "grey.50",
                  }
                : {},
              "& td": {
                borderBottom: showRowBorders ? "1px solid" : "none",
                borderColor: "divider",
                fontSize: 16,
                color: "grey.900",
                fontWeight: 500,
              },
            }}
          >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  sx={{ textAlign: "center", py: 4, color: "text.secondary" }}
                >
                  {emptyState || "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      {/* Footer: Pagination + Action bar */}
      <Box display="flex" flexDirection="column" gap={2.5}>
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </Box>
    </Box>
  );
}
