import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import type * as React from "react";

import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
  className,
  showBodyBorder = true,
  showRowBorders = true,
  bodyClassName,
  headerBackgroundColor = "bg-transparent",
  enableAlternatingRowColors = false,
  alternatingRowColor = "bg-muted/50",
  ...props
}: DataTableProps<TData>) {
  return (
    <div className={cn("flex w-full flex-col gap-2.5", className)} {...props}>
      {children}
      <div
        className={cn(
          "bg-background overflow-hidden rounded-lg",
          showBodyBorder && "border",
          bodyClassName
        )}
      >
        <Table>
          <TableHeader
            className={cn(
              "rounded-t-lg border-b bg-transparent",
              headerBackgroundColor
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn("border-none", headerBackgroundColor)}
              >
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      "border-none",
                      headerBackgroundColor,
                      index === 0 && "rounded-tl-lg",
                      index === headerGroup.headers.length - 1 &&
                        "rounded-tr-lg"
                    )}
                    // style={{
                    //   ...getCommonPinningStyles({ column: header.column }),
                    // }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    !showRowBorders && "border-none",
                    enableAlternatingRowColors &&
                      index % 2 === 1 &&
                      alternatingRowColor,
                    index === table.getRowModel().rows.length - 1 &&
                      "rounded-b-lg"
                  )}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        index === table.getRowModel().rows.length - 1 &&
                          cellIndex === 0 &&
                          "rounded-bl-lg",
                        index === table.getRowModel().rows.length - 1 &&
                          cellIndex === row.getVisibleCells().length - 1 &&
                          "rounded-br-lg"
                      )}
                      style={{
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={cn(!showRowBorders && "border-none")}>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  {emptyState || "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
