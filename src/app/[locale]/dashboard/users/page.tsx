"use client";

import React from "react";
import UsersTable from "./components/table/UsersTable";
import useGetUsers from "./hooks/useAdminStatistics";
import PageContainer from "../page";
import UsersSkeleton from "./components/UsersSkeleton";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <PageContainer>
      {isLoading ? <UsersSkeleton /> : <UsersTable data={data?.items || []} />}
    </PageContainer>
  );
};

export default UsersPage;
