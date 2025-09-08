"use client";

import PageContainer from "../page";
import useAdminStatistics from "../users/hooks/useAdminStatistics";
import StatCardList from "./components/StatCardList";
import StatCardSkeleton from "./components/StatCardSkeleton";

const DashboardPage = () => {
  const { data, isPending } = useAdminStatistics();
  return (
    <PageContainer>
      {isPending ? (
        <StatCardSkeleton />
      ) : (
        <StatCardList kpiData={data || undefined} />
      )}
    </PageContainer>
  );
};

export default DashboardPage;
