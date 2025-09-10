import {
  Card,
  CardContent,
  Typography,
  Divider,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import useGetProjects from "../../../projects/hooks/useGetProjects";
import { useParams } from "next/navigation";

const LatestLinkList = () => {
  const [timeRange, setTimeRange] = useState("7");
  const params = useParams<{ userId: string }>();
  const userId = params.userId ? params.userId : "";

  const { data: latestProjects } = useGetProjects({
    filters: { userId, sortType: 1, size: 5 },
  });

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 1, border: 0, bgcolor: "white", m: 2 }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body2" fontWeight="800" color="grey.900" mb={2}>
            Latest Backlinks
          </Typography>
        </Box>
        {latestProjects?.items?.map((link, i) => {
          const url = link?.backLinkUrl || "";
          const displayUrl =
            url && url.length > 24 ? url.slice(0, 24) + "..." : url;
          return (
            <Fragment key={i}>
              <Typography variant="subtitle2" sx={{ color: "blue.600", mb: 1 }}>
                {displayUrl}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Fragment>
          );
        })}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Select
            size="small"
            variant="standard"
            value={timeRange}
            sx={{
              "&::before": {
                borderBottom: "none !important",
              },
              "&::after": {
                borderBottom: "none !important",
              },
              color: "grey.500",
              fontSize: "14px",
            }}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="7" sx={{ fontSize: "14px" }}>
              Last 7 days
            </MenuItem>
            <MenuItem value="30" sx={{ fontSize: "14px" }}>
              Last 30 days
            </MenuItem>
            <MenuItem value="90" sx={{ fontSize: "14px" }}>
              Last 90 days
            </MenuItem>
          </Select>

          <Button variant="text" size="medium">
            <Typography
              variant="subtitle2"
              sx={{
                color: "blue.600",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              View Details
            </Typography>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LatestLinkList;
