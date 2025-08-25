import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { CustomDateTimePickerProps } from '../types';

const CustomDateTimePicker: FC<CustomDateTimePickerProps<Date>> = ({
  name,
  label,
  fullWidth = true,
  variant = 'outlined',
  valueFormatter,
  ...props
}) => {
  const { control } = useFormContext();
  const {
    field,
    formState: { errors },
  } = useController({ name, control });

  const handleChange = (date: unknown) => {
    let value = date;
    if (valueFormatter) {
      value = valueFormatter(value);
    }

    field.onChange(value);
  };

  return (
    <DateTimePicker
      {...props}
      label={label}
      value={field.value as unknown as never}
      onChange={handleChange}
      onSelectedSectionsChange={() => {}}
      closeOnSelect={true}
      slotProps={{
        textField: () => ({
          helperText: errors[name]?.message?.toString(),
          error: !!errors[name],
          fullWidth,
          variant,
          size: 'small',
        }),
      }}
    />
  );
};

export default CustomDateTimePicker;
