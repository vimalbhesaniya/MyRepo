import React, { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  SelectProps,
  FormHelperText,
  Typography,
  FormLabel,
} from "@mui/material";
import { useController } from "react-hook-form";

export interface SelectFieldOption {
  value: string | number;
  label: string;
}

export interface SelectFieldProps extends Omit<SelectProps, "onChange"> {
  options: SelectFieldOption[];
  label?: string;
  control?: any;
  error?: boolean;
  helperText?: string;
  name?: string;
  onChange?: (value: string | number) => void;
}

export function SelectField({
  options,
  label,
  error,
  helperText,
  value,
  control,
  name = "",
  ...selectProps
}: SelectFieldProps) {
  const [defaultValue] = useState("");
  const { field } = useController({
    name,
    control,
    defaultValue,
  });
  const { onChange } = field;
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      {label && (
        <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      )}
      <Select
        {...selectProps}
        {...field}
        value={value}
        error={error}
        fullWidth
        label={label}
        onChange={(e) => handleChange(e)}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="caption" color="red">
        {helperText}
      </Typography>
    </FormControl>
  );
}
