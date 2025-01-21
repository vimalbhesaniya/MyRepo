"use client";
import React, { useCallback, useContext, useEffect } from "react";
import {
  Textfield,
  usePostMethod,
  usePutMethod,
} from "@repo/sharedcomponentts";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { randomId } from "@/Utils/RandomId";
import { FormSchema, TypeForm } from "./type";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ScreenContext, ScreenType } from "@/Shared/Context/ScreenContext";

const Form = () => {
  const { setScreen } = useContext<ScreenType>(ScreenContext);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TypeForm>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(FormSchema),
  });
  const uid = randomId();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TypeForm) => {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}data`;
      const response = await usePostMethod(url, {
        ...data,
        id: uid.toString(),
        isComplated: false,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Success! Your account has been created.");
      reset();
      setScreen("");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  return (
    <>
      <Stack
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <Stack
          maxWidth={"100%"}
          width={"450px"}
          boxShadow={"0 0 3px gray"}
          borderRadius={"5px"}
          p={5}
        >
          <Typography color="primary" role="heading" variant="h4">
            Sign Up
          </Typography>
          <Typography mb={2}>Join us and start your journey today!</Typography>
          <form
            action=""
            onSubmit={handleSubmit((data) => {
              mutate(data);
            })}
          >
            <Grid2 container columns={1} size={12} spacing={2}>
              <Grid2 size={4}>
                <Textfield
                  control={control}
                  errorMessage={errors.email}
                  labelText="Email"
                  name="email"
                />
              </Grid2>
              <Grid2 size={4}>
                <Textfield
                  control={control}
                  errorMessage={errors.username}
                  labelText="Username"
                  name="username"
                />
              </Grid2>
              <Grid2 size={4}>
                <Textfield
                  control={control}
                  errorMessage={errors.password}
                  password={true}
                  type="password"
                  labelText="Password"
                  name="password"
                />
              </Grid2>
              <Grid2 size={4}>
                <Textfield
                  control={control}
                  password={true}
                  type="password"
                  errorMessage={errors.confirmPassword}
                  labelText="Confirm Password"
                  name="confirmPassword"
                />
              </Grid2>
              <Grid2 size={12}>
                <Button
                  fullWidth
                  disabled={isPending}
                  variant="contained"
                  type={"submit"}
                >
                  Register
                </Button>
              </Grid2>
            </Grid2>
          </form>
          <Stack mt={2} direction={"row"} alignItems={"center"}>
            <Typography mb={2}>
              Already have an Account?{" "}
              <Button onClick={() => router.push("/Login")} variant="text">
                Login
              </Button>{" "}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default Form;
