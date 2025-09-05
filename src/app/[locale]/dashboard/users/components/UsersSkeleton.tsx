import { Grid } from "@mui/material";
import React from "react";
import UserItemSkeleton from "./UserItemSkeleton";

const ROWS = 5;

const UsersSkeleton = () => {
  return (
    <Grid container>
      {new Array(ROWS).fill(1).map((_, index) => {
        return (
          <Grid size={{ xs: 12 }} key={index.toString()}>
            <UserItemSkeleton />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UsersSkeleton;
