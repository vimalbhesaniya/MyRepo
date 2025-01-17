"use client";
import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
type Props = {
  Icon: React.ComponentType;
  text: string;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "inherit";
};

const Icon = ({ Icon, text, variant }: Props) => {
  return (
    <>
      <Box
        mt={1}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Icon />
        <Typography variant={variant} >
          {text}
        </Typography>
      </Box>
    </>
  );
};

export default Icon;
