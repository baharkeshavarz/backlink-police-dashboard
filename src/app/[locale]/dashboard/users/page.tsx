"use client";

import React from "react";
import UsersTable from "./components/table/UsersTable";
import PageContainer from "../page";
import UsersSkeleton from "./components/UsersSkeleton";
import useGetUsers from "../overview/hooks/useGetUsers";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <PageContainer>
      {isLoading ? <UsersSkeleton /> : <UsersTable data={data?.items || []} />}
    </PageContainer>
  );
};

export default UsersPage;
