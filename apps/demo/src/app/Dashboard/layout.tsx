"use client";
import Header from "@/Components/Header/header";
import { Grid2, Stack } from "@mui/material";
import { Sidebar } from "@repo/sharedcomponentts";

export default function DahboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Grid2 container direction={"row"} display={"flex"}>
        <Grid2 size={2}>
          <Sidebar push={["Home", "Profile"]} />
        </Grid2>
        <Grid2 size={10} height={"100vh"} sx={{ overflowY: "scroll" }}>
          <Header />
          {children}
        </Grid2>
      </Grid2>
    </>
  );
}
