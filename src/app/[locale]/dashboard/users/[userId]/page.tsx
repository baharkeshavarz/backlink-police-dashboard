"use client";

import React from "react";
import PageContainer from "../../page";
import { Box, Grid } from "@mui/material";
import ProfileCard from "./components/ProfileCard";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";
import UserDashboard from "./components/UserDashboard";
import TransactionList from "../components/TransactionList";
import UserActivation from "../components/UserActivation";
import useGetUserDetails from "../hooks/useGetUserDetails";
import { useParams } from "next/navigation";
import useGetLocationDetails from "../../locations/hooks/useGetLocationDetails";

const UserDetails = () => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId ? params.userId : "";
  const { data } = useGetUserDetails({ userId });

  const { data: location } = useGetLocationDetails({
    locationId: Number(data?.countryId) ?? "",
  });

  return (
    <PageContainer>
      <Box height="100%" bgcolor="grey.50" mt={8}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <ProfileCard
              name={
                data?.firstName ? `${data?.firstName} ${data?.lastName}` : "-"
              }
              country={location?.title ?? "-"}
              email={data?.email ?? "-"}
              address={data?.address ?? "-"}
              phone={
                data?.phoneNumber ? `+ ${data?.zip} ${data?.phoneNumber}` : "-"
              }
              avatarUrl={
                data?.imageUrl || `${DEFAULT_DASHBOARD_ICONS}/user-icon.png`
              }
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
