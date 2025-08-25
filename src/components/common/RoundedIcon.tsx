import { Box, SxProps } from '@mui/material';
import React, { FC } from 'react';

type RoundedIconProps = {
  width: number;
  height: number;
  sxProp?: SxProps;
  icon?: any;
  onClickFunc?: VoidFunction;
};

const RoundedIcon: FC<RoundedIconProps> = ({
  width,
  height,
  icon,
  sxProp,
  onClickFunc,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="100%"
      width={width}
      height={height}
      sx={{ cursor: 'pointer', ...sxProp }}
      onClick={onClickFunc}
    >
      {icon}
    </Box>
  );
};

export default RoundedIcon;
