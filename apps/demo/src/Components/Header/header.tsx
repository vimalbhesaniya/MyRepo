import {
  Avatar,
  Button,
  Grid2,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { use, useContext, useEffect, useState } from "react";
import { ScreenContext, UserContext } from "@/app/layout";
import { useQuery } from "@tanstack/react-query";
import { useGetMethod } from "@repo/sharedcomponentts";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/Shared/Hooks/useCookie";

const Header = () => {
  const { user, setUser } = useContext<any>(UserContext);
  const { screen, setScreen } = useContext<any>(ScreenContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data, isSuccess } = useQuery({
    queryKey: ["getLoginUser"],
    queryFn: async () => {
      const loginId = await getCookie("Login");
      return await useGetMethod(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}data/${loginId}`
      );
    },
  });
  const route = useRouter();

  useEffect(() => {
    setUser(data);
  }, [data]);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = (open: string) => {
    setScreen(open);
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    deleteCookie("Login");
    route.replace("/");
  };

  return (
    <>
      <Grid2 container p={2} spacing={2} bgcolor={"thistle"}>
        <Grid2 size={8} display={"flex"} alignItems={"center"}>
          <Typography>Hello👋 {user?.username}</Typography>
        </Grid2>
        <Grid2
          size={4}
          gap={2}
          alignItems={"center"}
          display={"flex"}
          justifyContent={"end"}
        >
          <Stack className="pointer" onClick={handleClick}>
            <Avatar
              alt={user?.username}
              sx={{ bgcolor: "ActiveBorder" }}
              src="/static/images/avatar/1.jpg"
            />
          </Stack>
        </Grid2>
      </Grid2>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            route.push("/Dashboard/Profile");
          }}
        >
          My Profile
        </MenuItem>

        <MenuItem
          onClick={() =>
            handleProfile(user?.isComplated ? "EditProfile" : "Form")
          }
        >
          {user?.isComplated ? "Edit profile" : "Complete Profile"}
        </MenuItem>

        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
