import { Checkbox, FormControlLabel } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomSwitchProps } from "../types";

const CustomCheckbox: FC<CustomSwitchProps> = ({ label, name, ...props }) => {
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
            checked={!!field.value}
            defaultChecked={value}
            onChange={field.onChange}
            control={<Checkbox {...props} />}
            label={label}
            sx={{ ...(props?.sx || {}) }}
          />
        );
      }}
    />
  );
};

export default CustomCheckbox;
