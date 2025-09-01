"use client";

import { Box, Grid } from "@mui/material";
import StatCard from "./components/StatCard";
import UserProfile from "./components/UserProfile";
import { Icons } from "@/components/common/icons";
import UsersSearch from "../components/UsersSearch";
import PageContainer from "../page";

const DashboardPage = () => {
  return (
    <PageContainer>
      <Box sx={{ pt: 10, px: 2, bgcolor: "#f4f5ff", height: "100%" }}>
        <UsersSearch />
        <UserProfile />
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <StatCard
              title="Active users (Weekly)"
              value="348"
              diff="+15"
              icon={<Icons.FaUser size={37} color="#2747F0" />}
              color="#DCE7FA"
              diffPositive
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <StatCard
              title="Active income (Weekly)"
              value="10,289"
              diff="+100"
              icon={<Icons.TbCreditCardFilled size={37} color="#FF4EBE" />}
              color="#FFE2F5"
              diffPositive
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <StatCard
              title="Total backlinks (Daily)"
              value="10,289"
              diff="-50"
              icon={<Icons.TbUnlink size={37} color="#50C4A3" />}
              color="#D8FFF4"
              diffPositive={false}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <StatCard
              title="Total broken backlinks (Daily)"
              value="348"
              diff="+15"
              icon={<Icons.TbLinkOff size={37} color="#D4A347" />}
              color="#FFEBCE"
              diffPositive
            />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default DashboardPage;
