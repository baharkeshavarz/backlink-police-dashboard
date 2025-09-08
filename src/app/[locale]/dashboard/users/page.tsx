"use client";

import React from "react";
import UsersTable from "./components/table/UsersTable";
import PageContainer from "../page";
import UsersSkeleton from "./components/UsersSkeleton";
import useGetUsers from "../overview/hooks/useGetUsers";
import { Box } from "@mui/material";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <PageContainer>
      <Box mt={6}>
        {isLoading ? (
          <UsersSkeleton />
        ) : (
          <UsersTable data={data?.items || []} />
        )}
      </Box>
    </PageContainer>
  );
};

export default UsersPage;
