"use client";

import { Box } from "@mui/material";
import React from "react";
import UsersTable from "./components/table/UsersTable";
import useGetUsers from "./hooks/useGetUsers";

const UsersPage = () => {
  const { data } = useGetUsers();
  // console.log("data", data);
  return (
    <Box>
      <UsersTable data={{}} />
    </Box>
  );
};

export default UsersPage;
