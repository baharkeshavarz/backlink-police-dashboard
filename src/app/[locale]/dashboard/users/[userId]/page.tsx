"use client";

import React from "react";
import PageContainer from "../../page";
import { Box, Grid } from "@mui/material";
import ProfileCard from "./components/ProfileCard";
import UserDashboard from "./components/UserDashboard";
import TransactionList from "../components/TransactionList";
import UserActivation from "../components/UserActivation";

const UserDetails = () => {
  return (
    <PageContainer>
      <Box height="100%" bgcolor="grey.50" mt={2}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <ProfileCard />
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
