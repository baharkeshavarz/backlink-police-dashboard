import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import {
  IBacklinkProject,
  ProjectLinkFollowEnum,
  ProjectLinkScanEnum,
  ProjectLinkStatusEnum,
} from "@/services/projects/types";
import { Box, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Link } from "@/navigation";
import ProjectLinkStatus from "../ProjectLinkStatus";
import ProjectLinkFollowStatus from "../ProjectLinkFollowStatus";
import ProjectLinkScanStatus from "../ProjectLinkScanStatus";
import { RescanButton } from "../RescanButton";

export const ProjectsColumns = (
  handleEditClick: (projectId: number) => void
): ColumnDef<Partial<IBacklinkProject>>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: () => <Checkbox size="small" />,
    cell: () => {
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
      const url = cell.row.original.publisherUrl || "";
      const displayUrl =
        url && url.length > 16 ? url.slice(0, 16) + "..." : url;
      if (!url) return "-";
      return (
        <Link href={url} target="_blank">
          <Tooltip title={url}>
            <Typography
              variant="subtitle2"
              color="blue.600"
              fontWeight={400}
              sx={{
                display: "inline-block",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              {displayUrl}
            </Typography>
          </Tooltip>
        </Link>
      );
    },
  },
  {
    id: "anchorKeyWord",
    accessorKey: "anchorKeyWord",
    header: "Anchor Keyword",
    cell: ({ cell }) => {
      const value = cell.row.original.anchorKeyWord;
      return (
        <Typography variant="caption" fontWeight={500}>
          {value}
        </Typography>
      );
    },
  },
  {
    id: "backLinkUrl",
    accessorKey: "backLinkUrl",
    header: "BackLink URL",
    cell: ({ cell }) => {
      const url = cell.row.original.backLinkUrl || "";
      const displayUrl =
        url && url.length > 16 ? url.slice(0, 16) + "..." : url;
      if (!url) return "-";
      return (
        <Link href={url} target="_blank">
          <Tooltip title={url}>
            <Typography
              variant="subtitle2"
              color="blue.600"
              fontWeight={400}
              sx={{
                display: "inline-block",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                  cursor: "pointer",
                },
              }}
            >
              {displayUrl}
            </Typography>
          </Tooltip>
        </Link>
      );
    },
  },
  {
    id: "urlStatus",
    accessorKey: "urlStatus",
    header: "Link Status",
    cell: ({ cell }) => {
      const value = cell.row.original.urlStatus?.name as ProjectLinkStatusEnum;
      return value ? <ProjectLinkStatus status={value} /> : "-";
    },
  },
  {
    id: "followStatus",
    accessorKey: "followStatus",
    header: "Follow Status",
    cell: ({ cell }) => {
      const value = cell.row.original.followStatus
        ?.name as ProjectLinkFollowEnum;
      return value ? <ProjectLinkFollowStatus status={value} /> : "-";
    },
  },
  {
    id: "cost",
    accessorKey: "cost",
    header: "Cost",
    cell: ({ cell }) => {
      const value = `$${cell.row.original.cost}`;
      return (
        <Typography variant="caption" fontWeight={500}>
          {value}
        </Typography>
      );
    },
  },
  {
    id: "purchasedOn",
    accessorKey: "purchasedOn",
    header: "Purchased On",
    cell: ({ cell }) => {
      const value = cell.row.original.purchasedOn;
      return (
        <Typography variant="caption" fontWeight={500}>
          {value}
        </Typography>
      );
    },
  },
  {
    id: "lastScan",
    accessorKey: "lastScan",
    header: "Scan Status",
    cell: ({ cell }) => {
      const value = cell.row.original.lastScan?.name as ProjectLinkScanEnum;
      return value ? <ProjectLinkScanStatus status={value} /> : "-";
    },
  },
  {
    id: "lastScanDate",
    accessorKey: "lastScanDate",
    header: "Last Scan",
    size: 80,
    cell: ({ cell }) => {
      const data = cell.row.original.lastScanDate;
      if (!data) return <>-</>;
      const dateObj = new Date(data);
      const value = formatDistanceToNow(dateObj, { addSuffix: true });
      return (
        <Typography variant="caption" fontWeight={500}>
          {value}
        </Typography>
      );
    },
  },
  {
    id: "reScan",
    accessorKey: "",
    header: "Re-Scan",
    cell: ({ cell }) => {
      const projectLinkId = cell.row.original.projectId!;
      return <RescanButton projectLinkId={projectLinkId} />;
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
