import type { Table } from "@tanstack/react-table";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

import { Box, Typography, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";

interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalFromMeta = (
    table.options.meta as { totalCount?: number } | undefined
  )?.totalCount;
  const totalRows =
    typeof totalFromMeta === "number"
      ? totalFromMeta
      : table.getPrePaginationRowModel().rows.length;
  const currentPageCount = table.getRowModel().rows.length;

  const from = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const to =
    totalRows === 0
      ? 0
      : Math.min(pageIndex * pageSize + currentPageCount, totalRows);

  return (
    <Box display="flex" alignItems="center" ml={2}>
      {/* Navigation Buttons */}
      <Box display="flex" alignItems="center">
        {/* Pagination controls */}
        <IconButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
          size="small"
        >
          <ChevronLeft
            sx={{
              fontSize: 22,
              color: table.getCanPreviousPage() ? "black" : grey[900],
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
          size="small"
        >
          <ChevronRight
            sx={{
              fontSize: 22,
              color: table.getCanPreviousPage() ? "black" : grey[900],
            }}
          />
        </IconButton>
      </Box>
      {/* Page Information */}
      <Box gap={0.2} flex={1}>
        <Typography component="span" color="grey.500">
          Show{" "}
        </Typography>
        <Typography component="span" color="black">
          {from}
        </Typography>
        <Typography component="span" color="grey.500">
          {" "}
          -{" "}
        </Typography>
        <Typography component="span" color="black">
          {to}
        </Typography>
        <Typography component="span" color="grey.500">
          {" "}
          of{" "}
        </Typography>
        <Typography component="span" color="black">
          {totalRows}
        </Typography>
      </Box>
    </Box>
  );
}
