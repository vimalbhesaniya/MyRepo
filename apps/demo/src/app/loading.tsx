import { CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <>
      <div className="loader">
        <span style={{ fontSize: "24px" }}>
          <CircularProgress />
        </span>
      </div>
    </>
  );
};

export default loading;
