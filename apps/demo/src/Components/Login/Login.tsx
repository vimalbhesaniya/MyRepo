"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Textfield,
  useGetMethod,
  usePostMethod,
  usePutMethod,
} from "@repo/sharedcomponentts";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../../Shared/Modals/type";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "@/app/layout";
import { useRouter } from "next/navigation";
import { LoginFormType, LoginFormSchema } from "./type";
import { toast } from "react-toastify";
import { setCookie } from "@/Shared/Hooks/useCookie";
const Form = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext<any>(UserContext);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const { data, isPending } = useQuery({
    queryKey: ["login", loginData.email, loginData.password],
    enabled: !!loginData.email && !!loginData.password,
    queryFn: async () => {
      const data = await useGetMethod(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}data?email=${loginData.email}&password=${loginData.password}`
      );
      if (data?.length) {
        if (data[0].password === loginData.password) {
          setCookie("Login", data[0].id);
          setUser(data[0]);
          toast.success("You are in!");
          router.push("/Dashboard");
        }
      } else {
        toast.error("Email or Password are not matched");
      }
      return data;
    },
  });

  const handleLogin = handleSubmit((user) => {
    setLoginData(user);
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
            Login
          </Typography>
          <Typography mb={2}>Connect with us and Explore !</Typography>
          <form action="" onSubmit={handleLogin}>
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
                password={true}
                errorMessage={errors.password}
                labelText="Password"
                name="password"
              />
            </Grid2>
            <Grid2 size={12} mt={2}>
              <Button
                fullWidth
                color="success"
                variant="contained"
                type={"submit"}
              >
                Login
              </Button>
            </Grid2>
          </form>
          <Stack mt={2} direction={"row"} alignItems={"center"}>
            <Typography mb={2}>
              Don't have an Account?{" "}
              <Button
                role="link"
                onClick={() => router.push("Signup")}
                variant="text"
              >
                Sign Up
              </Button>{" "}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default Form;
