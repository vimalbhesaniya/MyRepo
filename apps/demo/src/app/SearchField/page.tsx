"use client";
import { Button, Grid2, Stack } from "@mui/material";
import { SearchField } from "@repo/sharedcomponentts";
import React from "react";
import { useForm } from "react-hook-form";
const page = () => {
  type SerachType = {
    search: string;
  };
  const { control, handleSubmit, watch } = useForm<SerachType>();
  return (
    <>
      <Stack gap={2} mt={5}>
        <Grid2 size={6}>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit((data) => {
                console.log(data);
              });
            }}
          >
            <SearchField
              name="search"
              typedValue={watch("search")}
              control={control}
            />
          </form>
        </Grid2>
      </Stack>
    </>
  );
};

export default page;
