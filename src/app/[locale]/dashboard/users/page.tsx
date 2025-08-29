"use client";

import React from "react";
import UsersTable from "./components/table/UsersTable";
import useGetUsers from "./hooks/useGetUsers";
import CustomSkeleton from "@/components/common/CustomSkeleton";

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <CustomSkeleton isLoading={isLoading}>
      <UsersTable data={data?.items || []} />
    </CustomSkeleton>
  );
};

export default UsersPage;
