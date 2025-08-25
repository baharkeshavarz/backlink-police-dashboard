import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { CustomRadioButtonsProps } from '../types';

const CustomRadioButtons: FC<CustomRadioButtonsProps> = ({
  label,
  name,
  options,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field }) => {
        const id = `${field.name}-radio-buttons`;
        return (
          <FormControl>
            <FormLabel id={id}>{label}</FormLabel>
            <RadioGroup
              value={field.value || ''}
              onChange={(event, value) => field.onChange(value || null)}
              aria-labelledby={id}
              name={field.name}
            >
              {options?.map((option, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        );
      }}
    />
  );
};

export default CustomRadioButtons;
