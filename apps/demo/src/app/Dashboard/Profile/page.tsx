"use client";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "@/app/layout";
import Icon from "@repo/icon/icon";
import PersonPinIcon from "@mui/icons-material/PersonPin";
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
          <Grid2 size={"grow"}>
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
              <Icon
                Icon={AlternateEmailIcon}
                text={user?.username}
                variant="h6"
              />
              <Icon
                Icon={MarkEmailUnreadIcon}
                text={user?.email}
                variant="subtitle2"
              />
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
              <Icon
                Icon={AlternateEmailIcon}
                text={user?.username}
                variant="h6"
              />
              <Icon
                Icon={MarkEmailUnreadIcon}
                text={user?.email}
                variant="subtitle2"
              />
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
            <Grid2 className="animate" size={12} bgcolor={"gainsboro"} p={2}>
              <Icon
                Icon={AlternateEmailIcon}
                text={user?.username}
                variant="h6"
              />
              <Icon
                Icon={MarkEmailUnreadIcon}
                text={user?.email}
                variant="subtitle2"
              />
            </Grid2>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default page;
