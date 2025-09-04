"use client";

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
import { useState } from "react";

const transactions = [
  { id: 1, desc: " Bonnie Green", amount: 15, status: "Completed" },
  {
    id: 2,
    desc: "Payment refund to #00910",
    amount: -25,
    status: "Completed",
    warning: true,
  },
  {
    id: 3,
    desc: "Payment failed from #tt087651",
    amount: 5,
    status: "Cancelled",
  },
  { id: 4, desc: " Lana Byrd", amount: 15, status: "In progress" },
  { id: 5, desc: " Jese Leos", amount: 5, status: "Completed" },
  {
    id: 6,
    desc: " THEMSBERG LLC",
    amount: 15,
    status: "Completed",
  },
];

const statusStyles = (status: string) => {
  if (status === "Completed") {
    return { bgcolor: "green.100", color: "green.900" };
  }
  if (status === "Cancelled") {
    return { bgcolor: "red.100", color: "red.800" };
  }
  if (status === "In progress") {
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
                {transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        <Typography variant="subtitle2">
                          Payment from
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {t.desc}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {t.amount < 0
                          ? `-$${Math.abs(t.amount)}`
                          : `$${t.amount}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t.status}
                        size="medium"
                        sx={{
                          borderRadius: "6px",
                          fontWeight: 600,
                          ...statusStyles(t.status),
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
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
