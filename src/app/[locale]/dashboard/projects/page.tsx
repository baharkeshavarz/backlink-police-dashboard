"use client";

import React from "react";
import PageContainer from "../page";
import ProjectsSkeleton from "./components/ProjectsSkeleton";
import useGetProjects from "./hooks/useGetProjects";
import ProjectsTable from "./components/table/ProjectsTable";

const UsersPage = () => {
  const { data, isLoading } = useGetProjects({});

  return (
    <PageContainer>
      {isLoading ? (
        <ProjectsSkeleton />
      ) : (
        <ProjectsTable data={data?.items || []} />
      )}
    </PageContainer>
  );
};

export default UsersPage;
