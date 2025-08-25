import { TextField } from '@mui/material';
import { FC } from 'react';
import { TextAreaProps } from '../types';

const TextAreaField: FC<TextAreaProps> = ({
  register,
  rows,
  name,
  label,
  defaultValue,
}) => {
  return (
    <TextField
      fullWidth
      sx={{ mt: 1 }}
      {...(register ? register(name) : {})}
      label={label}
      multiline
      rows={rows}
      defaultValue={defaultValue}
    />
  );
};

export default TextAreaField;
