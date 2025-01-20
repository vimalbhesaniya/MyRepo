"use client";
import React, { useEffect, useState } from "react";
import {
  FormLabel,
  Grid2,
  IconButton,
  InputAdornment,
  InputProps,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
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
}
export function Textfield({
  password = false,
  name = "",
  type = "",
  number = false,
  control,
  errorMessage,
  placeholder,
  labelText,
  ...props
}: Props) {
  const [defaultValue] = useState("");
  const [inputType, setInputType] = useState(type);
  const { field } = useController({
    name,
    control,
    defaultValue,
  });
  const { onChange } = field;
  const handleChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const value = event.target.value;
    onChange(value);
  };
  console.log(name);
  return (
    <>
      <Stack mt={1} width={"100%"}>
        {labelText && (
          <FormLabel
            component={"label"}
            style={{
              marginBottom: "10px",
            }}
          >
            {labelText}
          </FormLabel>
        )}
        {type == "textarea" ? (
          <>
            <TextareaAutosize
              {...field}
              maxRows={12}
              minRows={8}
              name={name}
              placeholder={placeholder}
              onChange={(event) => handleChange(event)}
              style={{
                borderRadius: "4px",
                border: errorMessage?.message
                  ? "2px solid red"
                  : "2px solid gray",
                outline: "none",
                width: "100%",
              }}
              defaultValue=""
            />
            <Typography variant="caption" color="red">
              {errorMessage?.message}
            </Typography>
          </>
        ) : (
          <TextField
            minRows={5}
            variant="standard"
            {...field}
            label={placeholder}
            fullWidth
            type={inputType}
            name={name}
            error={Boolean(errorMessage?.message)}
            helperText={errorMessage?.message}
            slotProps={{
              input: password
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        {password && (
                          <IconButton
                            onClick={() =>
                              setInputType(
                                inputType == "password" ? "text" : "password"
                              )
                            }
                            edge="end"
                          >
                            {inputType === "password" ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }
                : {},
            }}
            onChange={(event) => handleChange(event)}
          />
        )}
      </Stack>
    </>
  );
}
