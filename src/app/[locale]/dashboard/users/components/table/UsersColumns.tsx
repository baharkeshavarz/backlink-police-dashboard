import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import { IUser } from "@/services/users/types";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import UserStatus from "../UserStatus";
import Link from "next/link";
import { DEFAULT_DASHBOARD_USERS_PATH } from "@/constants/routes";

export const UsersColumns = (
  handleEditClick: (userId: string) => void
): ColumnDef<Partial<IUser>>[] => [
  {
    id: "id",
    accessorKey: "id",
    header: () => <Checkbox size="small" />,
    cell: ({ cell }) => {
      return (
        <Stack alignItems="flex-start">
          <Checkbox />
        </Stack>
      );
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: "name".toUpperCase(),
    cell: ({ cell }) => {
      const fullName = `${cell.row.original.firstName} ${cell.row.original.lastName}`;
      const email = cell.row.original.email;
      return (
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap={1}
        >
          <Avatar
            alt=""
            src={`${DEFAULT_DASHBOARD_ICONS}/user-test.jpg`}
            sx={{ width: 48, height: 48 }}
          />
          <Stack>
            <Typography variant="subtitle1" fontWeight="600">
              {fullName}
            </Typography>
            <Typography variant="subtitle2" color="grey.600" fontWeight="400">
              {email}
            </Typography>
          </Stack>
        </Box>
      );
    },
  },
  {
    id: "organization",
    accessorKey: "organization",
    header: "company".toUpperCase(),
    cell: ({ cell }) => {
      const value = cell.row.original.organization || "N/A";
      return <Box>{value}</Box>;
    },
  },
  {
    id: "lastSession",
    accessorKey: "lastSession",
    header: "last session".toUpperCase(),
    cell: ({ cell }) => {
      const value = cell.row.original.lastSession
        ? new Date(cell.row.original.lastSession).toLocaleDateString()
        : "N/A";

      return <Box>{value}</Box>;
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "status".toUpperCase(),
    cell: ({ cell }) => {
      const status = Math.random() < 0.5 ? 1 : 2; //TODO
      return <UserStatus status={status} />;
    },
  },
  {
    id: "operation",
    accessorKey: "",
    header: "",
    cell: ({ cell }) => {
      const userId = cell.row.original.id!;
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1.5}
        >
          <Button
            component={Link}
            href={`${DEFAULT_DASHBOARD_USERS_PATH}/${userId}`}
            variant="outlined"
            sx={{
              borderColor: "blue.400",
              color: "blue.600",
              width: "128px",
              height: "37px",
              display: "flex",
              alignItems: "center",
              gap: 0.1,
            }}
          >
            <RemoveRedEyeOutlined sx={{ fontSize: 15 }} />
            <Typography variant="subtitle2">View Profile</Typography>
          </Button>
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
            onClick={() => handleEditClick(userId)}
          >
            <Image
              alt="edit"
              src={`${DEFAULT_DASHBOARD_ICONS}/pencil-icon.svg`}
              width={16}
              height={16}
            />
          </IconButton>
        </Box>
      );
    },
  },
];
