"use client";
import React from "react";
import { Checkbox } from "@mui/material";
import {
  FormLabel,
  InputProps,
  Stack,
} from "@mui/material";
import { FieldError, useController } from "react-hook-form";

interface Props extends InputProps {
  name?: string;
  password?: true | false;
  number?: true | false;
  type?: string;
  control: any;
  placeholder?: string;
  errorMessage?: FieldError;
  labelText?: string;
  checked?: boolean;
  val: string;
}
export function CheckboxField({
  password = false,
  name = "",
  type = "",
  number = false,
  control,
  errorMessage,
  placeholder,
  labelText,
  val,
  checked,
}: Props) {
  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });
  const { value, onChange } = field;
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: selectedValue, checked } = event.target;
    if (checked) {
      onChange([...value, selectedValue]);
    } else {
      onChange(value.filter((v: string) => v !== selectedValue));
    }
  };

  return (
    <>
      <Stack direction={"row"} display={"flex"} alignItems={"center"}>
        <Checkbox
          {...field}
          id={val}
          onChange={handleCheckboxChange}
          value={val}
          checked={checked}
        />
        <FormLabel htmlFor={val}>{val}</FormLabel>
      </Stack>
    </>
  );
}
