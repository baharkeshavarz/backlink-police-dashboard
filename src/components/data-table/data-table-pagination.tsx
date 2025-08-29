import type { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@mui/material";

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;

  const startRow = (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalRows);

  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center gap-4 p-2 sm:flex-row sm:gap-2",
        className
      )}
      {...props}
    >
      {/* Navigation Buttons */}
      <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-0">
        <Button
          variant="outlined"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex flex-1 items-center gap-2 py-2 sm:flex-0 sm:border-0 sm:bg-transparent sm:text-white sm:shadow-none sm:hover:bg-white/20"
        >
          <ChevronLeft
            className="text-foreground size-6 dark:text-white"
            strokeWidth={2}
          />
          <span className="inline sm:hidden">Previous</span>
        </Button>

        <Button
          variant="text"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex flex-1 items-center gap-2 py-2 sm:flex-0 sm:bg-transparent sm:text-white sm:shadow-none sm:hover:bg-white/20"
        >
          <span className="inline sm:hidden">Next</span>
          <ChevronRight
            className="text-primary-foreground sm:text-foreground size-6"
            strokeWidth={2}
          />
        </Button>
      </div>
      {/* Page Information */}
      <div className="text-center text-base font-normal sm:text-start md:text-sm">
        <p className="text-muted-foreground">
          Showing{" "}
          <span className="text-foreground font-semibold">{currentPage}</span>{" "}
          to <span className="text-foreground font-semibold">{totalPages}</span>{" "}
          of <span className="text-foreground font-semibold">{totalPages}</span>{" "}
          pages
        </p>
      </div>
    </div>
  );
}
