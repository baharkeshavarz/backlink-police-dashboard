import { Box } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const UsersColumns: ColumnDef<any>[] = [
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      const value = cell.row.original.status;
      let color = "";
      const statusName = value.name?.toLowerCase();
      if (statusName === "done") color = "bg-[#D7E84F] text-[#234F18]";
      else if (statusName === "rejected") color = "bg-[#FDE8E8] text-[#9B1C1C]";
      else color = "bg-[#DCE7FA] text-[#42389D]";
      return <Box>{value.name}</Box>;
    },
  },
  {
    id: "payedPrice",
    accessorKey: "payedPrice",
    header: "Amount",
    cell: ({ cell }) => (
      <span className="text-sm leading-tight font-semibold">
        {cell.getValue<number>() < 0 ? "-" : ""}$
        {Math.abs(cell.getValue<number>())}
      </span>
    ),
  },
  {
    id: "startDate",
    accessorKey: "startDate",
    header: "Date & Time",
    cell: ({ cell }) => {
      const date = cell.row.original.startDate;
      return (
        <span className="text-muted-foreground text-sm leading-tight font-normal">
          {format(new Date(date), "dd MMM yyyy")}
        </span>
      );
    },
  },
  {
    id: "transaction",
    accessorKey: "transaction",
    header: "Transaction",
    cell: ({ cell }) => (
      <span className="text-sm leading-tight font-normal">
        Payment from{" "}
        <span className="text-sm font-medium">
          {cell.row.original.userFirstName +
            " " +
            cell.row.original.userLastName}
        </span>
      </span>
    ),
  },
];
