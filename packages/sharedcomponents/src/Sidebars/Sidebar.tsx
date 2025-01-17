"use client";
import { Box, Button, Grid2, Paper, styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  push: string[];
};
type RenderItemsProps = {
  array: string[];
};
import { v4 as uuidv4 } from "uuid";

const RenderItems = ({ array }: RenderItemsProps) => {
  const route = useRouter();
  return array.map((item) => {
    return (
      <Grid2
        key={uuidv4()}
        className="pointer"
        borderRadius={"4px 0px 0px 4px "}
        border={"1px solid gray"}
        m={1}
        onClick={() => route.replace(`/Dashboard/${item}`)}
      >
        <Typography
          p={1}
          fontSize={"12px"}
          borderRadius={"4px 0px 0px 4px "}
          borderLeft={"5px solid #729EA1"}
          color="whitesmoke"
          className="poppins-semibold LinkHover"
        >
          {item}
        </Typography>
      </Grid2>
    );
  });
};

export function Sidebar({ push }: Props) {
  const [items, setItems] = useState<string[]>([]);
  console.log(items);
  useEffect(() => {
    setItems(push);
  }, [push]);
  const route = useRouter();
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          bgcolor: "black",
        }}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <Grid2 container p={2} direction={"column"}>
          <Grid2
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Heading>My Packages</Heading>
          </Grid2>
          <Grid2 mt={3}>
            <RenderItems array={items} />
          </Grid2>
        </Grid2>
        <Grid2 container p={2}>
          <Button
            color="warning"
            variant="outlined"
            sx={{ marginBottom: "20px" }}
            fullWidth
            onClick={() => {
              localStorage.clear();
              route.push("/");
            }}
          >
            Log Out
          </Button>
        </Grid2>
      </Box>
    </>
  );
}

const Heading = styled(Typography)({
  fontSize: "22px",
  color: "skyblue",
});

const Classes = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
