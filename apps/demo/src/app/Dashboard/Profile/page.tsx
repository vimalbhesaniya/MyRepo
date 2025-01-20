"use client";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/layout";
import Icon from "@repo/icon/icon";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./styles.css";
import { Textfield, usePutMethod } from "@repo/sharedcomponentts";
import { useForm } from "react-hook-form";
import { PasswordForm, TypePassword } from "@/app/Signup/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/Shared/Hooks/useCookie";
const page = () => {
  const { user, setUser } = useContext<any>(UserContext);
  const [active, setActive] = useState("");
  const [error, setError] = useState("");
  const route = useRouter();
  const icon = (screen: string) => {
    return active == screen ? (
      <KeyboardArrowUpIcon />
    ) : (
      <KeyboardArrowDownIcon />
    );
  };

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TypePassword>({
    defaultValues: {
      currentPassword: "",
      confirmPassword: "",
      password: "",
    },
    resolver: zodResolver(PasswordForm),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: TypePassword) => {
      await usePutMethod(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}data/${user?.id}`,
        {
          ...user,
          password: data.password,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLoginUser"] });
      toast.success("Password changed successfully");
    },
  });

  const handlePasswordChange = handleSubmit(async (data) => {
    if (data.currentPassword !== user.password) {
      setError("Current password is not matched");
    } else {
      setError("");
      mutate(data);
      await deleteCookie("Login");
      route.replace("/");
    }
  });

  return (
    <>
      <Stack m={5}>
        <Grid2 spacing={1} container size={12}>
          <Grid2 size={"grow"} display={"flex"} gap={3} alignItems={"center"}>
            <Box
              sx={{
                borderRadius: "50%",
                height: "150px",
                width: "100%",
                maxWidth: "150px",
                bgcolor: "ActiveBorder",
              }}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography color="info" variant="h1">
                {user?.username?.slice(0, 1)}
              </Typography>
            </Box>
            <Box>
              <Typography>{user?.username}</Typography>
              <Typography>{user?.email}</Typography>
            </Box>
          </Grid2>
        </Grid2>
        <Grid2
          mt={5}
          bgcolor={"whitesmoke"}
          p={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="pointer"
          onClick={() => setActive("PersonalDetails")}
        >
          <Typography color="textDisabled" variant="h6">
            Personal Details
          </Typography>
          {icon("PersonalDetails")}
        </Grid2>
        {active == "PersonalDetails" && (
          <Stack>
            <Grid2 className="animate" size={12} bgcolor={"gainsboro"} p={2}>
              <Box bgcolor={"ghostwhite"} p={1}>
                <Icon
                  Icon={AlternateEmailIcon}
                  text={user?.username}
                  variant="h6"
                />
              </Box>
              <Box bgcolor={"ghostwhite"} p={1}>
                <Icon
                  Icon={MarkEmailUnreadIcon}
                  text={user?.email}
                  variant="subtitle2"
                />
              </Box>
            </Grid2>
          </Stack>
        )}
        <Grid2
          mt={5}
          bgcolor={"whitesmoke"}
          p={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="pointer"
          onClick={() => setActive("Description")}
        >
          <Typography color="textDisabled" variant="h6">
            Description
          </Typography>
          {icon("Description")}
        </Grid2>
        {active == "Description" && (
          <Stack>
            <Grid2 size={12} className="animate" bgcolor={"gainsboro"} p={2}>
              <Typography
                color="info"
                p={1}
                bgcolor={"ghostwhite"}
                variant="subtitle2"
              >
                {user?.discription || "No Description Found"}
              </Typography>
            </Grid2>
          </Stack>
        )}
        <Grid2
          mt={5}
          bgcolor={"whitesmoke"}
          p={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="pointer"
          onClick={() => setActive("ProfileDetails")}
        >
          <Typography color="textDisabled" variant="h6">
            Profile Details
          </Typography>
          {icon("Securiy&Privacy")}
        </Grid2>
        {active == "ProfileDetails" && (
          <Stack>
            <Grid2
              container
              className="animate"
              size={12}
              spacing={2}
              bgcolor={"gainsboro"}
              p={2}
            >
              <Grid2 p={1} size={2} borderLeft={"4px solid black"}>
                <Typography>Skills</Typography>
              </Grid2>
              <Grid2 size={10} container>
                {user?.skills ? (
                  user?.skills.map((skill: string) => {
                    return (
                      <Typography
                        key={uuidv4()}
                        border={"1px solid gray"}
                        borderRadius={1}
                        color="info"
                        bgcolor={"ghostwhite"}
                        p={1}
                      >
                        {skill}
                      </Typography>
                    );
                  })
                ) : (
                  <Typography
                    border={"1px solid gray"}
                    borderRadius={1}
                    color="info"
                    bgcolor={"ghostwhite"}
                    p={1}
                  >
                    No Skills Found
                  </Typography>
                )}
              </Grid2>
            </Grid2>
            <Grid2
              container
              className="animate"
              size={12}
              spacing={2}
              bgcolor={"gainsboro"}
              p={2}
            >
              <Grid2 p={1} size={2} borderLeft={"4px solid black"}>
                <Typography>Profession</Typography>
              </Grid2>
              <Grid2 size={10} container>
                <Typography
                  border={"1px solid gray"}
                  borderRadius={1}
                  color="info"
                  bgcolor={"ghostwhite"}
                  p={1}
                >
                  {user?.profession || "No Profesion Found"}
                </Typography>
              </Grid2>
            </Grid2>
          </Stack>
        )}
        <Grid2
          mt={5}
          bgcolor={"whitesmoke"}
          p={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="pointer"
          onClick={() => setActive("Securiy&Privacy")}
        >
          <Typography color="textDisabled" variant="h6">
            Securiy & Privacy
          </Typography>
          {icon("ProfileDetails")}
        </Grid2>
        {active == "Securiy&Privacy" && (
          <Stack>
            <form action="" onSubmit={handlePasswordChange}>
              <Grid2
                container
                className="animate"
                size={12}
                spacing={2}
                bgcolor={"gainsboro"}
                p={2}
              >
                <Grid2 p={1} size={2} borderLeft={"4px solid black"}>
                  <Typography>Change Password</Typography>
                </Grid2>
                <Grid2 size={10}>
                  <Grid2 size={10} container>
                    <Textfield
                      fullWidth
                      password={true}
                      type="password"
                      control={control}
                      name="currentPassword"
                      labelText="Current Password"
                      errorMessage={
                        errors.currentPassword || ({ message: error } as any)
                      }
                    />
                  </Grid2>
                  <Grid2 size={10} container>
                    <Textfield
                      control={control}
                      name="password"
                      type="password"
                      password={true}
                      labelText="New Password"
                      errorMessage={errors.password}
                    />
                  </Grid2>
                  <Grid2 size={10} container>
                    <Textfield
                      type="password"
                      control={control}
                      name="confirmPassword"
                      password={true}
                      errorMessage={errors.confirmPassword}
                      labelText="Confirm Password"
                    />
                  </Grid2>
                  <Grid2 mt={2} size={10} container>
                    <Button type="submit" variant="contained">
                      Change Password
                    </Button>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2
                container
                className="animate"
                size={12}
                spacing={2}
                bgcolor={"gainsboro"}
                p={2}
              ></Grid2>
            </form>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default page;
