"use client";

import React from "react";
import UsersTable from "./components/table/UsersTable";
import PageContainer from "../page";
import { Box } from "@mui/material";

const UsersPage = () => {
  return (
    <PageContainer>
      <Box mt={6}>
        <UsersTable />
      </Box>
    </PageContainer>
  );
};

export default UsersPage;
