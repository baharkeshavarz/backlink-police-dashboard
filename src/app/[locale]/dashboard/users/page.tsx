"use client";

import React from "react";
import UsersTable from "./components/table/UsersTable";
import PageContainer from "../page";

const UsersPage = () => {
  return (
    <PageContainer>
      <UsersTable />
    </PageContainer>
  );
};

export default UsersPage;
