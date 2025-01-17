"use client";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "@/app/layout";
import Icon from "@repo/icon/icon";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./styles.css";
const page = () => {
  const { user, setUser } = useContext<any>(UserContext);
  const [active, setActive] = useState("");
  console.log("call--user", user);
  const icon = (screen: string) => {
    return active == screen ? (
      <KeyboardArrowUpIcon />
    ) : (
      <KeyboardArrowDownIcon />
    );
  };
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
              <Typography bgcolor={"ghostwhite"} p={1}>
                <Icon
                  Icon={AlternateEmailIcon}
                  text={user?.username}
                  variant="h6"
                />
              </Typography>
              <Typography bgcolor={"ghostwhite"} p={1}>
                <Icon
                  Icon={MarkEmailUnreadIcon}
                  text={user?.email}
                  variant="subtitle2"
                />
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
          {icon("ProfileDetails")}
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
                      <>
                        <Typography
                          border={"1px solid gray"}
                          borderRadius={1}
                          color="info"
                          bgcolor={"ghostwhite"}
                          p={1}
                        >
                          {skill}
                        </Typography>
                      </>
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
      </Stack>
    </>
  );
};

export default page;
