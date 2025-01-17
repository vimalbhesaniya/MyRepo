import { Box, Card, CircularProgress, Grid2, Typography } from "@mui/material";
import React from "react";

const DemoModal = () => {
  return (
    <>
      <Box boxShadow={10} borderRadius={2} width={"400px"} bgcolor={"white"} height={"400px"}>
        <Typography>This is my Modal</Typography>
      </Box>
    </>
  );
};

export default DemoModal;
