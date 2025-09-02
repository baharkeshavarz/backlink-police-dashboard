"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import EditUserForm from "../../components/EditUserForm";
import { useParams } from "next/navigation";

export default function UserDashboard() {
  const [editMode, setEditMode] = useState(false);
  const [timeRange, setTimeRange] = useState("7");
  const { id } = useParams<{ id: string }>();

  return (
    <Grid container spacing={1}>
      {/* Left Column */}
      <Grid size={{ xs: 12, sm: 8 }}>
        <Card
          variant="outlined"
          sx={{ borderRadius: 1, border: 0, bgcolor: "white" }}
        >
          <CardContent>
            <Typography variant="body2" fontWeight="800" color="grey.900">
              General information
            </Typography>
            <EditUserForm userId={id} />
            <Box display="flex" gap={2} mt={3}>
              <Button variant="outlined" onClick={() => setEditMode(!editMode)}>
                {editMode ? "Cancel" : "Edit"}
              </Button>
              {editMode && (
                <Button variant="contained" color="primary">
                  Save all
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Column */}
      <Grid size={{ xs: 12, sm: 4 }}>
        {/* Latest Backlinks */}
        <Card sx={{ borderRadius: 3, boxShadow: 1, mb: 3 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="body2" fontWeight="800" color="grey.900">
                Latest Backlinks
              </Typography>
              <Select
                size="small"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="7">Last 7 days</MenuItem>
                <MenuItem value="30">Last 30 days</MenuItem>
                <MenuItem value="90">Last 90 days</MenuItem>
              </Select>
            </Box>

            {Array.from({ length: 5 }).map((_, i) => (
              <Typography
                key={i}
                variant="subtitle2"
                sx={{ color: "blue.600", mb: 1 }}
              >
                www.Our-Client.com
              </Typography>
            ))}

            <Typography
              variant="body2"
              sx={{
                color: "blue.500",
                fontWeight: "bold",
                cursor: "pointer",
                mt: 1,
              }}
            >
              VIEW DETAIL →
            </Typography>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
          <CardContent>
            <Typography
              variant="body2"
              fontWeight="800"
              color="grey.900"
              mb={1}
            >
              Payment information
            </Typography>
            <Typography variant="subtitle1" color="grey.600">
              Visa ending in 8607
            </Typography>
            <Typography variant="subtitle2" fontWeight={600} sx={{ mt: 0.5 }}>
              Next payment of $15 occurs on August 13, 2020.
            </Typography>

            <Box display="flex" gap={2} mt={2}>
              <Button variant="outlined">Edit</Button>
              <Button variant="contained" color="primary">
                Add a new card
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
