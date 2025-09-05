"use client";

import {
  Checkbox,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";

const ProjectItemSkeleton = () => {
  return (
    <Table>
      <TableBody>
        {Array.from({ length: 1 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox">
              <Checkbox size="small" disabled />
            </TableCell>

            <TableCell>
              <Skeleton variant="text" width={100} height={20} />
            </TableCell>

            <TableCell>
              <Skeleton variant="text" width={100} height={20} />
            </TableCell>

            <TableCell>
              <Skeleton variant="text" width={100} height={20} />
            </TableCell>

            <TableCell>
              <IconButton disabled>
                <Skeleton variant="circular" width={37} height={20} />
              </IconButton>
            </TableCell>

            <TableCell>
              <IconButton disabled>
                <Skeleton variant="circular" width={37} height={20} />
              </IconButton>
            </TableCell>

            <TableCell>
              <Skeleton variant="text" width={100} height={20} />
            </TableCell>

            <TableCell>
              <Skeleton variant="text" width={100} height={20} />
            </TableCell>

            <TableCell>
              <IconButton disabled>
                <Skeleton variant="circular" width={37} height={20} />
              </IconButton>
            </TableCell>

            <TableCell>
              <Skeleton variant="text" width={100} height={20} />
            </TableCell>

            <TableCell>
              <Skeleton variant="circular" width={37} height={20} />
            </TableCell>

            <TableCell>
              <Skeleton variant="circular" width={37} height={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ProjectItemSkeleton;
