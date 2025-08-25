import { Box, Typography } from '@mui/material';
import { styled, SxProps } from '@mui/system';
import { FC, ReactNode } from 'react';

const Line = styled(Box)(({ theme }) => ({
  height: '1px',
  backgroundColor: theme.palette.grey[300],
  flexGrow: 1,
}));

interface LinearFieldsetProps {
  title?: ReactNode;
  lineColor?: string;
  titleSize?: string;
  borderWidth?: number;
  borderRadius?: number;
  sx?: SxProps;
}
const LinearFieldset: FC<LinearFieldsetProps> = ({
  title,
  lineColor = 'grey.700',
  titleSize = '1rem',
  borderWidth = 0,
  borderRadius = 2,
  sx = {},
  ...props
}) => {
  return (
    <Box display="flex" alignItems="center" width="100%" m={1} p={1.2}>
      <Line />
      <Typography
        sx={{
          px: 1,
          fontSize: titleSize,
          color: lineColor,
          borderColor: lineColor,
          borderWidth: borderWidth,
          borderRadius: borderRadius,
          ...sx,
        }}
        {...props}
      >
        {title}
      </Typography>
      <Line />
    </Box>
  );
};
export default LinearFieldset;
