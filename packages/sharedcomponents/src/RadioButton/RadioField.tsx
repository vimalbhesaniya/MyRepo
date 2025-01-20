import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputProps,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React from "react";
import { FieldError, useController } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
export interface RadioFieldOptions {
  value: string | number;
  label: string;
}

interface Props extends InputProps {
  name?: string;
  RadioOptions: RadioFieldOptions[];
  type?: string;
  control: any;
  placeholder?: string;
  errorMessage?: FieldError;
  labelText?: string;
  defaultValue?: string;
}

export function RadioField({
  name = "",
  control,
  RadioOptions,
  defaultValue,
}: Props) {
  const {
    field,
    formState: { errors },
  } = useController({ name, control, defaultValue: "" });
  const { onChange } = field;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("call--e.target.value", e.target.value);
    onChange(e.target.value);
  };
  console.log("call--defaultValue", defaultValue);
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={defaultValue}
        name={name}
      >
        <Stack direction={"row"}>
          {RadioOptions.map((option) => {
            return (
              <FormControlLabel
                {...field}
                key={uuidv4()}
                name={name}
                onChange={(e: any) => handleChange(e)}
                value={option.value}
                control={<Radio />}
                checked={defaultValue == option.value}
                label={option.label}
              />
            );
          })}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}
