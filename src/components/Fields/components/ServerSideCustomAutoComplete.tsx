"use client";

import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  CircularProgress,
  debounce,
  TextField,
} from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomSkeleton from "../../common/CustomSkeleton";
import useLocalFormContext from "../hooks/useLocalFormContext";
import { Option, ServerSideCustomAutoCompleteProps } from "../types";

const ServerSideCustomAutoComplete: FC<ServerSideCustomAutoCompleteProps> = ({
  name,
  size,
  label,
  disabledOnChange = false,
  ...props
}) => {
  const { control } = useFormContext();
  const context = useLocalFormContext();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const mutateAsync = useCallback(
    async (searchText: string | null) => {
      setIsLoading(true);
      const options = await props.queryFn(searchText);
      setOptions([...options]);
      setIsLoading(false);
    },
    [props]
  );

  useEffect(() => {
    if (open && options.length === 0) {
      mutateAsync(null);
    }
  }, [mutateAsync, open, options.length]);

  const handleChangeInput = debounce(async (event) => {
    const searchText = event.target.value;
    await mutateAsync(searchText);
  }, 700);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <CustomSkeleton isLoading={context?.isLoading}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, value, name },
          formState: { errors },
        }) => {
          const selectedOption: Option | null =
            options.find((item) => item.value === value) ?? null;

          return (
            <Autocomplete
              {...props}
              id="server-side-selective"
              open={open}
              onOpen={handleOpen}
              onClose={() => {
                setOpen(false);
              }}
              size={size}
              value={selectedOption}
              onChange={(event, value) => onChange(value?.value)}
              isOptionEqualToValue={(option, value) =>
                option.value.toString() === value.toString()
              }
              getOptionLabel={(option) => option.label?.toString?.() || ""}
              options={options}
              loading={isLoading}
              clearIcon={
                <Close
                  sx={{
                    fontSize: 14,
                  }}
                  fontSize="small"
                  color="inherit"
                  onClick={() => {
                    onChange(null);
                  }}
                />
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  error={!!errors[name]}
                  helperText={errors[name]?.message?.toString()}
                  onChange={!disabledOnChange ? handleChangeInput : undefined}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoading && (
                          <CircularProgress color="inherit" size={20} />
                        )}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          );
        }}
      />
    </CustomSkeleton>
  );
};

export default ServerSideCustomAutoComplete;
