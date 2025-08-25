import { Close } from '@mui/icons-material';
import { IconButton, SxProps } from '@mui/material';
import { FC } from 'react';

interface ClearButtonAdornmentProps {
  onChange: (val: unknown) => void;
  sx?: SxProps;
}

const ClearButtonAdornment: FC<ClearButtonAdornmentProps> = ({
  onChange,
  sx = {},
}) => {
  const onClear = () => {
    onChange(null);
  };
  return (
    <IconButton tabIndex={-1} size="small" onClick={onClear} sx={sx}>
      <Close
        sx={{
          fontSize: 14,
        }}
        fontSize="small"
        color="inherit"
      />
    </IconButton>
  );
};

export default ClearButtonAdornment;
