"use client";
import React, { useContext, useState } from "react";
import { Grid2, Stack, Typography } from "@mui/material";
import { useGetMethod } from "@repo/sharedcomponentts";
import { useQuery, useMutation } from "@tanstack/react-query";
import CustomCard from "./components/card";
import { v4 as uuid } from "uuid";

const TextField = () => {
  const getData = async () => {
    return await useGetMethod(`${process.env.NEXT_PUBLIC_BACKEND_URL}jobs`);
  };

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getData,
    initialData: [],
  });

  return (
    <>
      <Stack
        gap={2}
        direction={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={2}
        spacing={8}
      >
        <Grid2 size={12} container>
          <Grid2 size={4}>{/* <SearchField control={} /> */}</Grid2>
          <Grid2
            size={8}
            display={"flex"}
            gap={2}
            flexDirection={"column"}
            p={5}
          >
            <Typography variant="h5" mb={2}>
              Recently added
            </Typography>
            {data?.map((job: any) => {
              return <CustomCard key={uuid()} data={job} />;
            })}
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};
export default TextField;
