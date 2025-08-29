"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UsersColumns } from "./UsersColumns";
import { DataTable } from "@/components/data-table/data-table";

type Props = {
  data: any;
};

export default function UsersTable({ data }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const { table } = useDataTable({
    data: data,
    columns: UsersColumns,
    pageCount: data.pageCount,
    shallow: false,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedIds = selectedRows.map((row) => row.original.id);

  const handleDeleteSuccess = () => {
    table.resetRowSelection();
    router.refresh();
  };

  const handleSort = (columnId: string) => {
    const column = table.getColumn(columnId);
    if (column) {
      const isSorted = column.getIsSorted();
      if (isSorted === "asc") {
        column.toggleSorting(true); // desc
      } else if (isSorted === "desc") {
        column.clearSorting();
      } else {
        column.toggleSorting(false); // asc
      }
    }
  };

  // Get current sort state
  const currentSort = table.getState().sorting[0];
  const currentSortColumn = currentSort
    ? table.getColumn(currentSort.id)
    : null;
  const currentSortDirection = currentSort?.desc ? "desc" : "asc";

  // Get sort icon based on direction
  const getSortIcon = (direction: "asc" | "desc") => {
    return "desc";
    //return direction === "desc" ? (
    //   <Icons.TbSortDescending2 className="size-5" strokeWidth={1.5} />
    // ) : (
    //   <Icons.TbSortAscending2 className="size-5" strokeWidth={1.5} />
    // );
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        {/* Search, Sort, Delete section */}
        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
          <div className="flex w-full items-center gap-4 lg:w-fit">
            {/* <SearchInput placeholder="Search for a link" /> */}
            <div className="bg-border h-6 w-px" />
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="whitespace-nowrap">
                  {currentSortColumn ? (
                    getSortIcon(currentSortDirection)
                  ) : (
                    <Icons.TbSortDescending2
                      className="size-5"
                      strokeWidth={1.5}
                    />
                  )}
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSort("publisherUrl")}>
                  {currentSortColumn?.id === "publisherUrl" &&
                    getSortIcon(currentSortDirection)}
                  Publisher URL
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("anchorKeyWord")}>
                  {currentSortColumn?.id === "anchorKeyWord" &&
                    getSortIcon(currentSortDirection)}
                  Anchor Keyword
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("backlinkUrl")}>
                  {currentSortColumn?.id === "backlinkUrl" &&
                    getSortIcon(currentSortDirection)}
                  Backlink URL
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("cost")}>
                  {currentSortColumn?.id === "cost" &&
                    getSortIcon(currentSortDirection)}
                  Cost
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("purchasedOn")}>
                  {currentSortColumn?.id === "purchasedOn" &&
                    getSortIcon(currentSortDirection)}
                  Purchased On
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort("lastScanDate")}>
                  {currentSortColumn?.id === "lastScanDate" &&
                    getSortIcon(currentSortDirection)}
                  Last Scan
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
            {/* {selectedIds.length > 0 && permissions.canEditBacklinks && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDeleteDialogOpen(true)}
                className="whitespace-nowrap"
              >
                <Icons.HiTrash className="text-muted-foreground size-5" />
              </Button>
            )} */}
          </div>
        </div>

        {/* Action buttons section */}
        <div className="flex flex-col gap-2 md:w-full md:flex-row lg:w-fit">
          {/* {permissions.showInviteButton && (
            <Button
              asChild
              variant="secondaryOutline"
              className="w-full md:flex-1 lg:w-fit"
            >
              <Link
                href={`/projects/1/invitation`}
                className="flex items-center gap-2"
              >
                <Icons.Plus /> Invite People
              </Link>
            </Button>
          )} */}
          {/* {permissions.canEditBacklinks && (
            <UploadLinksDialog
              projectId={projectId}
              trigger={
                <Button
                  variant="secondaryOutline"
                  className="w-full md:flex-1 lg:w-fit"
                >
                  Upload Multiple Links
                </Button>
              }
            />
          )} */}
          {/* {permissions.canEditBacklinks && (
            <BackLinkDialog
              projectId={projectId}
              trigger={
                <Button
                  variant="secondary"
                  className="w-full md:flex-[2] lg:w-fit"
                >
                  <Icons.Plus /> Add Link
                </Button>
              }
            />
          )} */}
        </div>
      </div>

      <DataTable
        table={table}
        emptyState={
          data.noFilterTotalCount > 0 ? undefined : "test"
          // <BackLinkEmptyState
          //   projectId={projectId}
          //   permissions={permissions}
          // />
        }
      >
        {/* <DataTableToolbar table={table} /> */}
      </DataTable>

      {/* {permissions.canEditBacklinks && (
        <BulkDeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          selectedIds={selectedIds}
          projectId={projectId}
          onSuccess={handleDeleteSuccess}
        />
      )} */}
    </div>
  );
}
