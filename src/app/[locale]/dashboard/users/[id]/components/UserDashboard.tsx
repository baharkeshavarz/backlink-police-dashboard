"use client";

import { Grid } from "@mui/material";
import GeneralInfomation from "./GeneralInfomation";
import LatestLinkList from "./LatestLinkList";
import PaymentInformation from "./PaymentInformation";

export default function UserDashboard() {
  return (
    <Grid container spacing={1}>
      {/* Left Column */}
      <Grid size={{ xs: 12, sm: 8 }}>
        <GeneralInfomation />
      </Grid>
      {/* Right Column */}
      <Grid size={{ xs: 12, sm: 4 }}>
        <LatestLinkList />
        <PaymentInformation />
      </Grid>
    </Grid>
  );
}
