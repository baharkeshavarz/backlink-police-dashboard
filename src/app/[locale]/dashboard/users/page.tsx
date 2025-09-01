"use client";

import React from "react";
import UsersTable from "./components/table/UsersTable";
import useGetUsers from "./hooks/useGetUsers";
import CustomSkeleton from "@/components/common/CustomSkeleton";
import PageContainer from "../page";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <PageContainer>
      <CustomSkeleton isLoading={isLoading}>
        <UsersTable data={data?.items || []} />
      </CustomSkeleton>
    </PageContainer>
  );
};

export default UsersPage;
