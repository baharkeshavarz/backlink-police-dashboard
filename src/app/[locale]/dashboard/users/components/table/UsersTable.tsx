"use client";

import { useDataTable } from "@/hooks/use-data-table";
import { UsersColumns } from "./UsersColumns";
import { DataTable } from "@/components/data-table/data-table";
import { IUser } from "@/services/users/types";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import Image from "next/image";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";

type Props = {
  data: IUser[];
};

export default function UsersTable({ data }: Props) {
  const [search, setSearch] = useState("");

  const { table } = useDataTable({
    data: data,
    columns: UsersColumns,
    pageCount: data.length,
    shallow: false,
  });

  return (
    <Box width="100%">
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        {/* Left Section - Search + Icons */}
        <Box display="flex" alignItems="center" gap={0.5}>
          <TextField
            size="small"
            placeholder="Search for users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: 562,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Box display="flex" alignItems="center">
            <Divider orientation="vertical" sx={{ mx: 1, height: 19 }} />
            <IconButton>
              <SettingsIcon sx={{ fontSize: 19 }} />
            </IconButton>
            <IconButton>
              <DeleteIcon sx={{ fontSize: 19 }} />
            </IconButton>
            <IconButton>
              <InfoIcon sx={{ fontSize: 19 }} />
            </IconButton>
            <IconButton>
              <MoreVertIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </Box>
        </Box>

        {/* Right Section - Buttons */}
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 20 }} />}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            <Typography variant="subtitle2"> Add user</Typography>
          </Button>
          <Button
            variant="outlined"
            startIcon={
              <Image
                alt=""
                src={`${DEFAULT_DASHBOARD_ICONS}/document-download-icon.svg`}
                width={20}
                height={20}
              />
            }
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            <Typography variant="subtitle2" color="grey.800">
              Export
            </Typography>
          </Button>
        </Box>
      </Paper>

      <DataTable table={table}></DataTable>
    </Box>
  );
}
