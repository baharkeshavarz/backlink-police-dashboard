import { InputAdornment, TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import CustomSkeleton from '../../common/CustomSkeleton';
import useLocalFormContext from '../hooks/useLocalFormContext';
import { CurrencyTextFieldProps } from '../types';
import ClearButtonAdornment from './ClearButtonAdornment';

const toLocaleString = (value: any) => {
  if ([undefined, null].includes(value)) {
    return '';
  }

  return (
    typeof value === 'number' ? value : +value.replace(/\D/g, '')
  ).toLocaleString();
};

export const extractNumbers = (value: number | string): number | null => {
  if (typeof value === 'string' && !value) {
    return null;
  }

  const _value = +value?.toString()?.replace(/\D/g, '');

  if (isNaN(_value)) {
    return 0;
  }

  return _value;
};

const CurrencyTextField: FC<CurrencyTextFieldProps> = ({
  limitations,
  size = 'small',
  fullWidth = true,
  currencyLabel,
  ...props
}) => {
  const { control } = useFormContext();
  const { isLoading } = useLocalFormContext();

  return (
    <Controller
      control={control}
      name={props?.name || ''}
      render={({ field: { onChange, value }, formState: { errors } }) => {
        const _value = toLocaleString(value);
        return (
          <CustomSkeleton isLoading={isLoading}>
            <TextField
              {...props}
              fullWidth={fullWidth}
              size={size}
              multiline
              value={_value}
              onChange={(e) => {
                const _value = extractNumbers(e.target.value);

                if (_value === null) {
                  onChange(null);
                } else {
                  const _max = limitations?.max || Infinity;
                  const _min = limitations?.min || -Infinity;

                  if (_value <= _max && _value >= _min) {
                    onChange(_value);
                  }
                }
              }}
              error={!!errors[props?.name || '']}
              helperText={errors[props?.name || '']?.['message']?.toString()}
              InputProps={{
                endAdornment: (
                  <>
                    {props?.InputProps?.endAdornment}
                    {_value && <ClearButtonAdornment onChange={onChange} />}
                    {currencyLabel && (
                      <InputAdornment position="end">
                        {currencyLabel}
                      </InputAdornment>
                    )}
                  </>
                ),
              }}
            />
          </CustomSkeleton>
        );
      }}
    />
  );
};

export default CurrencyTextField;
