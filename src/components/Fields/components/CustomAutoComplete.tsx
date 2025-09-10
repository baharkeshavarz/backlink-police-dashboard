import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomSkeleton from "../../common/CustomSkeleton";
import { CustomAutoCompleteProps, Option } from "../types";
import useLocalFormContext from "../hooks/useLocalFormContext";

const CustomAutoComplete: FC<
  CustomAutoCompleteProps<Option, false, false, false>
> = ({
  options = [],
  name,
  size,
  label,
  resetFieldsOnChange = [],
  ...props
}) => {
  const { control, setValue } = useFormContext();
  const context = useLocalFormContext();
  return (
    <CustomSkeleton isLoading={context?.isLoading}>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        {label && (
          <Typography variant="subtitle2" mb={1}>
            {label}
          </Typography>
        )}
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, value, name },
            formState: { errors },
          }) => (
            <Autocomplete
              {...props}
              size={size}
              onChange={(event, item) => {
                onChange(item?.value ?? null);

                if (resetFieldsOnChange?.length) {
                  resetFieldsOnChange.forEach((key) => {
                    setValue(key, null);
                  });
                }
              }}
              value={
                options.find((item) => item.id === value) ?? {
                  label: "",
                  id: 0,
                  value: "",
                }
              }
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // label={label}
                  error={!!errors[name]}
                  helperText={errors[name]?.message?.toString()}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          )}
        />
      </Box>
    </CustomSkeleton>
  );
};

export default CustomAutoComplete;
