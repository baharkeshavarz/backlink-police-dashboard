"use client";

import { Icons } from "@/components/common/icons";
import { IAdminStatisticsKPI } from "@/services/statistics/types";
import { Grid } from "@mui/material";
import StatCard from "./StatCard";

interface StatCardListProps {
  kpiData: IAdminStatisticsKPI | undefined;
}

const StatCardList = ({ kpiData }: StatCardListProps) => {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          title="Active users (Weekly)"
          value={kpiData?.activeWeeklyUsersCount || 0}
          diff="+0"
          icon={<Icons.FaUser size={37} color="#2747F0" />}
          color="#DCE7FA"
          diffPositive
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          title="Active income (Weekly)"
          value={kpiData?.activeWeeklyIncome || 0}
          diff="+0"
          icon={<Icons.TbCreditCardFilled size={37} color="#FF4EBE" />}
          color="#FFE2F5"
          diffPositive
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          title="Total backlinks (Daily)"
          value={kpiData?.totalBrokenBacklinks || 0}
          diff="-0"
          icon={<Icons.TbUnlink size={37} color="#50C4A3" />}
          color="#D8FFF4"
          diffPositive={false}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 3 }}>
        <StatCard
          title="Total broken backlinks (Daily)"
          value={kpiData?.totalBrokenBacklinks || 0}
          diff="+0"
          icon={<Icons.TbLinkOff size={37} color="#D4A347" />}
          color="#FFEBCE"
          diffPositive
        />
      </Grid>
    </Grid>
  );
};

export default StatCardList;
