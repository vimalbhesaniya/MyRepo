"use client";
import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import {
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  InputProps,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { FieldError, useController, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
  ...props
}: Props) {
  const { field } = useController({
    name: "skills",
    control,
    defaultValue: [],
  });
  const { value, onChange } = field;
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: skill, checked } = event.target;
    if (checked) {
      onChange([...value, skill]);
    } else {
      onChange(value.filter((v: string) => v !== skill));
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
