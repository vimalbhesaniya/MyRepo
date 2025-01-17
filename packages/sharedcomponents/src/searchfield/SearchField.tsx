"use client";
import React, { useEffect, useState } from "react";
import {
  FormLabel,
  InputAdornment,
  InputProps,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { FieldError, useController } from "react-hook-form";
import { SearchRounded } from "@mui/icons-material";

interface Props extends InputProps {
  name?: string;
  password?: true | false;
  number?: true | false;
  type?: string;
  control: any;
  errorMessage?: FieldError;
  labelText?: string;
  typedValue?: string;
  suggest?: [];
  suggetion?: boolean;
}
export function SearchField({
  suggetion = false,
  suggest = [],
  password = false,
  name = "",
  type = "",
  number = false,
  control,
  typedValue = "",
  errorMessage,
  labelText,
  ...props
}: Props) {
  const [defaultValue, setDefaultValue] = useState("");
  const [suggested, setSuggested] = useState([
    "vimal bhesaniya",
    "prince sudani",
    "raj golakiya",
  ]);
  const [selectedIndex, setSelectedIndex] = useState<any>(-2);
  const [typed, setTyped] = useState("");
  const [suggetions, setSuggetions] = useState<string[]>([]);
  const {
    fieldState,
    field,
    formState: { dirtyFields },
  } = useController({
    name,
    control,
    defaultValue,
  });
  const { onChange, value } = field;

  const handleChange = (event: {
    target: {
      value: string;
    };
  }) => {
    const value = event.target.value;
    setTyped(value);
    onChange(value);
  };

  const onkeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      console.log("set as a zero");
      setSelectedIndex(selectedIndex + 1);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex(selectedIndex - 1);
      setTyped(suggetions[selectedIndex] || "");
    }

    if (e.key === "Enter") {
      setSuggetions([]);
    }
  };

  useEffect(() => {
    if (selectedIndex === suggetions.length + 1) {
      setSelectedIndex(0);
    } else if (selectedIndex === -1) {
      setSelectedIndex(0);
    }
    setTyped(suggetions[selectedIndex] || "");
  }, [selectedIndex]);

  useEffect(() => {
    const array = suggested.filter((e) => e.includes(typedValue));
    setSuggetions(array);
  }, [typedValue]);

  return (
    <>
      <Stack>
        <FormLabel
          component={"label"}
          style={{
            color: "black",
          }}
        >
          {labelText}
        </FormLabel>
        <TextField
          variant="filled"
          type="text"
          onKeyDown={(e) => onkeydown(e)}
          label={labelText}
          fullWidth
          value={typed}
          error={Boolean(errorMessage?.message)}
          helperText={errorMessage?.message}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchRounded />
                </InputAdornment>
              ),
            },
          }}
          onChange={(event) => handleChange(event)}
        />
        {
          <Stack>
            <List>
              {typedValue &&
                suggetions.map((text, index) => {
                  return (
                    <ListItemButton
                      key={uuidv4()}
                      selected={selectedIndex == index}
                    >
                      <ListItemText color="red" primary={text} />
                    </ListItemButton>
                  );
                })}
            </List>
          </Stack>
        }
      </Stack>
    </>
  );
}
