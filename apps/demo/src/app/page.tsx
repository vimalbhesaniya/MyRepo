"use client";
import Image from "next/image";
import React from "react";
import { Container, Grid2, Box, Typography, Button } from "@mui/material";
import Login from "@/Components/Login/Login";
import { useRouter } from "next/navigation";

export const AuthRoute = () => {
  const route = useRouter();
  const userExist = localStorage.getItem("Login");
  if (userExist) {
    route.replace("Dashboard");
  } else {
    return <Login />;
  }
};

export default function Home() {
  return <>{AuthRoute()}</>;
}
