"use client";
import React, { useContext, useState } from "react";
import { Button, Stack } from "@mui/material";
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
} from "../layout";

const TextField = () => {
  const getData = async () => {
    return await useGetMethod(`${process.env.NEXT_PUBLIC_BACKEND_URL}data`);
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
        <Button onClick={() => handleDeleteMutation.mutate(row?.id)}>
          <DeleteIcon />
        </Button>
        <Button onClick={() => handleUpdate(row)}>
          <EditIcon />
        </Button>
      </>
    );
  };
  return (
    <>
      <Stack gap={4} marginTop={2}>
        <Table
          Actions={renderActions}
          cells={TableCells}
          rows={data}
          isPending={isLoading}
        />
      </Stack>
    </>
  );
};
export default TextField;
