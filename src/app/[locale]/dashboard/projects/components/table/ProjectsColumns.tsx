import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { IBacklinkProject } from "@/services/projects/types";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export const ProjectsColumns = (
  handleEditClick: (projectId: number) => void
): ColumnDef<Partial<IBacklinkProject>>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: () => <Checkbox size="small" />,
    cell: ({ cell }) => {
      return (
        <Box alignItems="flex-start">
          <Checkbox />
        </Box>
      );
    },
  },
  {
    id: "publisherUrl",
    accessorKey: "publisherUrl",
    header: "Destination URL",
    cell: ({ cell }) => {
      const value = cell.row.original.publisherUrl || "N/A";
      return <Box>{value}</Box>;
    },
  },
  {
    id: "anchorKeyWord",
    accessorKey: "anchorKeyWord",
    header: "Anchor Keyword",
    cell: ({ cell }) => {
      const value = cell.row.original.anchorKeyWord;
      return <Box>{value}</Box>;
    },
  },
  {
    id: "backLinkUrl",
    accessorKey: "backLinkUrl",
    header: "BackLink URL",
    cell: ({ cell }) => {
      const value = cell.row.original.backLinkUrl;
      return <Box>{value}</Box>;
    },
  },
  {
    id: "urlStatus",
    accessorKey: "urlStatus",
    header: "Link Status",
    cell: ({ cell }) => {
      const value = cell.row.original.urlStatus?.name;
      return <Box>{value}</Box>;
    },
  },
  {
    id: "followStatus",
    accessorKey: "followStatus",
    header: "Follow Status",
    cell: ({ cell }) => {
      const value = cell.row.original.followStatus?.name;
      return <Box>{value}</Box>;
    },
  },
  {
    id: "cost",
    accessorKey: "cost",
    header: "Cost",
    cell: ({ cell }) => {
      const value = `${cell.row.original.cost}$`;
      return <Box>{value}</Box>;
    },
  },
  {
    id: "purchasedOn",
    accessorKey: "purchasedOn",
    header: "PurchasedOn",
    cell: ({ cell }) => {
      const value = cell.row.original.purchasedOn;
      return <Box>{value}</Box>;
    },
  },
  {
    id: "lastScan",
    accessorKey: "lastScan",
    header: "Scan Status",
    cell: ({ cell }) => {
      const value = cell.row.original.lastScan?.name;
      return <Box>{value}</Box>;
    },
  },
  {
    id: "lastScanDate",
    accessorKey: "lastScanDate",
    header: "Last Scan",
    cell: ({ cell }) => {
      const value = cell.row.original.lastScanDate;
      if (!value) return <>-</>;
      const dateObj = new Date(value);
      const displayValue = formatDistanceToNow(dateObj, { addSuffix: true });
      return <Box>{displayValue}</Box>;
    },
  },
  {
    id: "reScan",
    accessorKey: "",
    header: "Re-Scan",
    cell: ({ cell }) => {
      const userId = cell.row.original.id!;
      return (
        <Button
          variant="text"
          sx={{
            "&:hover": {
              bgcolor: "blue.50",
            },
          }}
        >
          <RefreshCcw color="#111928" width="58px" height="18px" />
        </Button>
      );
    },
  },
  {
    id: "edit",
    accessorKey: "",
    header: "Edit",
    cell: ({ cell }) => {
      const projectId = cell.row.original.id!;
      return (
        <IconButton
          aria-label="edit"
          sx={{
            width: 39,
            height: 37,
            bgcolor: "blue.600",
            borderRadius: 1,
            "&:hover": {
              bgcolor: "blue.700",
            },
          }}
          onClick={() => handleEditClick(projectId)}
        >
          <Image
            alt="edit"
            src={`${DEFAULT_DASHBOARD_ICONS}/pencil-icon.svg`}
            width={16}
            height={16}
          />
        </IconButton>
      );
    },
  },
];
