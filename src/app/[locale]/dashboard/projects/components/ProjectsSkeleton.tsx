import { Grid } from "@mui/material";
import React from "react";
import ProjectItemSkeleton from "./ProjectItemSkeleton";

const ProjectsSkeleton = () => {
  return (
    <Grid container>
      {new Array(5).fill(1).map((_, index) => {
        return (
          <Grid size={{ xs: 12 }} key={index.toString()}>
            <ProjectItemSkeleton />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ProjectsSkeleton;
