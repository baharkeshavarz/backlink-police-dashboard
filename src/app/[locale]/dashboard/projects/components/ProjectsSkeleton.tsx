import { Grid } from "@mui/material";
import React from "react";
import ProjectItemSkeleton from "./ProjectItemSkeleton";

const ROWS = 10;

const ProjectsSkeleton = () => {
  return (
    <Grid container>
      {new Array(ROWS).fill(1).map((_, index) => {
        return <ProjectItemSkeleton key={index.toString()} />;
      })}
    </Grid>
  );
};

export default ProjectsSkeleton;
