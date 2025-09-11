import React from "react";
import ProjectsTable from "../../../projects/components/table/ProjectsTable";
import { Grid } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import PageContainer from "../../../PageContainer";

const page = () => {
  return (
    <PageContainer>
      <Grid container>
        <Grid size={{ xs: 12, md: 1.6 }}>
          <ProfileCard />
        </Grid>
        <Grid size={{ xs: 12, md: 10.4 }}>
          <ProjectsTable />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default page;
