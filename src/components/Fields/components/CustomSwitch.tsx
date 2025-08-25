import { FormControlLabel, Switch } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomSwitchProps } from '../types';

const CustomSwitch: FC<CustomSwitchProps> = ({ label, name, ...props }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field }) => {
        const value = !!field.value || false;
        return (
          <FormControlLabel
            value={value}
            checked={value}
            defaultChecked={value}
            onChange={field.onChange}
            control={<Switch {...props} />}
            label={label}
          />
        );
      }}
    />
  );
};

export default CustomSwitch;
