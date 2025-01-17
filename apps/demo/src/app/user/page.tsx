"use client";
import React, { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import data from "../../assets/data.json";
import PersonIcon from "@mui/icons-material/Person";
import Icon from "@repo/icon/icon";
import MailIcon from "@mui/icons-material/Mail";
const UserDashboard = () => {
  const navigate = useRouter();
  const handleProfileClick = (id: Number) => {
    console.log("id", id);
    navigate.push(`/user/${id}`);
  };
  return (
    <>
      <Container>
        <Grid
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={5}
        >
          {data.map(
            ({ email, first_name, gender, id, jobTitle, last_name }, index) => {
              return (
                <>
                  <Box
                    key={uuidv4()}
                    sx={{
                      width: "100%",
                      maxWidth: "350px",
                      height: "200px",
                    }}
                    padding={1.4}
                    bgcolor={"whitesmoke"}
                  >
                    <Typography
                      bgcolor={"lightskyblue"}
                      padding={1}
                      borderRadius={1}
                      textOverflow={"ellipsis"}
                      noWrap
                      borderLeft={"5px solid blue"}
                      role="heading"
                      fontSize={15}
                      fontWeight={600}
                      key={jobTitle}
                    >
                      {jobTitle}
                    </Typography>
                    <Icon
                      Icon={PersonIcon}
                      text={`${first_name} ${last_name}`}
                    />
                    <Icon Icon={MailIcon} text={`${email}`} />
                    <Button
                      onClick={() => handleProfileClick(id)}
                      sx={{ marginTop: "10px" }}
                      variant="outlined"
                      color="info"
                      fullWidth
                    >
                      View profile
                    </Button>
                  </Box>
                </>
              );
            }
          )}
        </Grid>
      </Container>
    </>
  );
};

export default UserDashboard;
