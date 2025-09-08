import { Grid } from "@mui/material";
import React from "react";
import StatCardItemSkeleton from "./StatCardItemSkeleton";

const ROWS = 4;

const StatCardSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {new Array(ROWS).fill(1).map((_, index) => {
        return (
          <Grid size={{ xs: 12, sm: 3 }} key={index.toString()}>
            <StatCardItemSkeleton />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatCardSkeleton;
