"use client";
import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import {
  useGetMethod,
  Table,
  useDeleteMethod,
  usePutMethod,
} from "@repo/sharedcomponentts";
import { useQuery, useMutation } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataContext,
  ScreenContext,
  ScreenType,
  UpdateContext,
  UpdateType,
} from "@/app/layout";
import CustomCard from "./components/card";
import { v4 as uuid } from "uuid";

const TextField = () => {
  const getData = async () => {
    return await useGetMethod(`${process.env.NEXT_PUBLIC_BACKEND_URL}jobs`);
  };

  const { isUpdating, setIsUpdating } = useContext<UpdateType>(UpdateContext);
  const { screen, setScreen } = useContext<ScreenType>(ScreenContext);
  const { globalObject, setGlobalObject } = useContext<any>(DataContext);
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getData,
    initialData: [],
  });

  const TableCells = data?.length
    ? !isLoading
      ? Object.keys(data[0])
      : []
    : [];

  const handleDelete = (id: any) =>
    useDeleteMethod(`${process.env.NEXT_PUBLIC_BACKEND_URL}data/${id}`);

  const handleUpdate = (row: any) => {
    setIsUpdating(true);
    setGlobalObject(row);
    setScreen("Form");
  };

  const handleDeleteMutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (id) => handleDelete(id),
    onSuccess: () => refetch(),
  });

  const handleUpdateMutation = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (id) => {
      debugger;
      return handleDelete(id);
    },
    onSuccess: () => refetch(),
  });

  const renderActions: any = (row: any) => {
    return (
      <>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleDeleteMutation.mutate(row?.id)}
        >
          Apply
        </Button>
      </>
    );
  };
  console.log(data);
  return (
    <>
      <Stack gap={2} direction={'row'} flexWrap={'wrap'} alignItems={'center'} justifyContent={'center'}  marginTop={2}>
        {/* <Table
          Actions={renderActions}
          cells={TableCells}
          rows={data}
          isPending={isLoading}
        /> */}
        {data?.map((job: any) => {
          return <CustomCard key={uuid()} data={job} />;
        })}
      </Stack>
    </>
  );
};
export default TextField;
