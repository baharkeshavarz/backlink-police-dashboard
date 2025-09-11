"use client";

import { Box } from "@mui/material";
import UsersSearch from "../components/UsersSearch";
import PageContainer from "../PageContainer";
import useAdminStatistics from "./hooks/useAdminStatistics";
import StatCardList from "./components/StatCardList";
import StatCardSkeleton from "./components/StatCardSkeleton";
import UserProfile from "./components/UserProfile";

const DashboardPage = () => {
  const { data, isPending } = useAdminStatistics();
  return (
    <PageContainer>
      <Box sx={{ pt: 3, px: 2, bgcolor: "#f4f5ff", height: "100%" }}>
        <UsersSearch />
        <UserProfile />
        {isPending ? (
          <StatCardSkeleton />
        ) : (
          <StatCardList kpiData={data || undefined} />
        )}
      </Box>
    </PageContainer>
  );
};

export default DashboardPage;
