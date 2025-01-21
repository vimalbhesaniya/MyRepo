import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Icon from "@repo/icon/icon";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';
const CustomCard = ({ data }: any) => {
  console.log(data);
  return (
    <>
      <Card
        variant="outlined"
        sx={{ maxWidth: "500px", width: "100%" }}
      >
        <CardContent>
          <Grid2 
            container
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"center"}
            display={"flex"}
          >
            <Typography variant="h5" component="div" gutterBottom>
              {data?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
              >
                <BusinessIcon /> {data?.company}
              </Box>
            </Typography>
          </Grid2>
          <Typography variant="body2" color="text.secondary">
            <Icon Icon={LocationOnIcon} text={data?.location} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Icon Icon={CurrencyRupeeIcon} text={data?.salary} />
          </Typography>
          <Typography variant="h6">About this job</Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            -{data?.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "right" }}>
          <Button size="small" variant="outlined" color="primary">
            Apply Now
          </Button>
          <Button  size="small" variant="outlined" color="primary" >
            <BookmarkBorderIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default CustomCard;
