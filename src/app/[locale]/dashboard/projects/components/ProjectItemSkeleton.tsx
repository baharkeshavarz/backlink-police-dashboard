"use client";

import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const ROWS = 5;

const ProjectItemSkeleton = () => {
  return (
    <Table>
      <TableBody>
        {Array.from({ length: ROWS }).map((_, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox">
              <Checkbox size="small" disabled />
            </TableCell>

            <TableCell>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ width: 48, height: 48 }}>
                  <Skeleton variant="circular" width={48} height={48} />
                </Avatar>
                <Stack>
                  <Skeleton variant="text" width={120} height={20} />
                  <Skeleton variant="text" width={160} height={16} />
                </Stack>
              </Box>
            </TableCell>

            {/* Company */}
            <TableCell>
              <Skeleton variant="text" width={100} height={20} />
            </TableCell>

            {/* Last session */}
            <TableCell>
              <Skeleton variant="text" width={80} height={20} />
            </TableCell>

            {/* Status */}
            <TableCell>
              <Skeleton
                variant="rectangular"
                width={60}
                height={24}
                sx={{ borderRadius: 1 }}
              />
            </TableCell>

            {/* Operation buttons */}
            <TableCell>
              <Box display="flex" gap={1.5}>
                <Skeleton variant="rectangular" width={128} height={37} />
                <IconButton disabled>
                  <Skeleton variant="circular" width={37} height={37} />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ProjectItemSkeleton;
