"use client";

import useGetOrders from "@/hooks/useGetOrders";
import {
  Box,
  Card,
  CardContent,
  Chip,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";

const statusStyles = (status: number) => {
  if (status === 0) {
    return { bgcolor: "green.100", color: "green.900" };
  }
  if (status === 1) {
    return { bgcolor: "red.100", color: "red.800" };
  }
  if (status === 2) {
    return { bgcolor: "blue.400", color: "blue.700" };
  }
  return { bgcolor: "grey.200", color: "grey.800" };
};

// General styles for table cells
const cellStyles = {
  header: {
    fontWeight: "600",
    backgroundColor: "grey.50",
    color: "grey.500",
  },
  body: { py: 1.5 },
};
const TransactionList = () => {
  const [timeRange, setTimeRange] = useState("7");
  const params = useParams();
  const userId = params.userId ? params.userId : "";
  const { data: orders } = useGetOrders({
    filters: { userId: userId as string },
  });

  return (
    <Box sx={{ p: 4 }}>
      <Card
        variant="outlined"
        sx={{
          border: 0,
        }}
      >
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Stack>
              <Typography variant="body2" fontWeight="800" color="grey.900">
                Transactions
              </Typography>
              <Typography variant="subtitle2" color="grey.500" mt={1}>
                This is a list of latest transactions.
              </Typography>
            </Stack>

            <Typography
              variant="subtitle1"
              color="blue.600"
              sx={{ cursor: "pointer" }}
            >
              View all
            </Typography>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={cellStyles.header}>
                    <Typography textTransform="uppercase" variant="caption">
                      Transaction
                    </Typography>
                  </TableCell>
                  <TableCell sx={cellStyles.header}>
                    <Typography textTransform="uppercase" variant="caption">
                      Amount
                    </Typography>
                  </TableCell>
                  <TableCell sx={cellStyles.header}>
                    <center></center>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.items &&
                  orders?.items?.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>
                        <Stack direction="row" spacing={0.5}>
                          <Typography variant="subtitle2">
                            {t.projectName}
                          </Typography>
                          <Typography variant="subtitle2" fontWeight={600}>
                            ({t.subscriptionPlanName})
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t.payedPrice < 0
                            ? `-$${Math.abs(t.payedPrice)}`
                            : `$${t.payedPrice}`}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t.status.name}
                          size="medium"
                          sx={{
                            borderRadius: "6px",
                            fontWeight: 600,
                            ...statusStyles(t.status.value),
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                {orders?.items?.length === 0 && (
                  <Typography variant="subtitle2" color="grey.500" py={3}>
                    No Transactions Found.
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={2}>
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
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TransactionList;
