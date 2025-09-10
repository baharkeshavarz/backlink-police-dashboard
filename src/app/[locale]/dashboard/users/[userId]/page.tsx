import React from "react";
import PageContainer from "../../page";
import { Box, Grid } from "@mui/material";
import ProfileCard from "./components/ProfileCard";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import UserDashboard from "./components/UserDashboard";
import TransactionList from "../components/TransactionList";
import UserActivation from "../components/UserActivation";

const UserDetails = () => {
  return (
    <PageContainer>
      <Box height="100%" bgcolor="grey.50" mt={8}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <ProfileCard
              name="Kyle Mani"
              country="United States of America"
              email="kyle@cwct.com"
              address="92 Miles Drive, Newark, NJ 07103, California, United States of America"
              phone="+00 123 456 789 / +12 345 678"
              avatarUrl={`${DEFAULT_DASHBOARD_ICONS}/user-test.jpg`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 9 }}>
            <UserDashboard />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TransactionList />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <UserActivation />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default UserDetails;
