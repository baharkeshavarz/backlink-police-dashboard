import { DatePicker } from '@mui/x-date-pickers';
import { Controller, useFormContext } from 'react-hook-form';
import CustomSkeleton from '../../common/CustomSkeleton';
import useLocalFormContext from '../hooks/useLocalFormContext';
import { FC } from 'react';

interface CustomYearPickerProps {
  name: string;
  size?: 'small' | 'medium';
  label: string;
}

const CustomYearPicker: FC<CustomYearPickerProps> = ({ name, size, label }) => {
  const { control } = useFormContext();

  const { isLoading } = useLocalFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ formState, field }) => {
        const _value =
          typeof field?.value === 'number' && field?.value !== 0
            ? new Date(new Date().setFullYear(field?.value))
            : null;

        return (
          <CustomSkeleton isLoading={isLoading}>
            <DatePicker
              value={_value}
              label={label}
              name={field.name}
              onChange={(value) => {
                field.onChange(value?.getFullYear?.() || 0);
              }}
              views={['year']}
              enableAccessibleFieldDOMStructure={true}
              formatDensity="dense"
              onSelectedSectionsChange={() => true}
              selectedSections="all"
              slotProps={{
                textField: {
                  size,
                  fullWidth: true,
                  helperText: formState.errors[name]?.message?.toString(),
                  error: !!formState.errors[name],
                },
              }}
            />
          </CustomSkeleton>
        );
      }}
    />
  );
};

export default CustomYearPicker;
