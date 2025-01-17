import { Grid2, Modal } from "@mui/material";
import { ScreenContext, ScreenType } from "@/app/layout";
import { useContext } from "react";

import { CloseRounded } from "@mui/icons-material";
import Form from "./Modals/Form";

const Body = () => {
  const { screen } = useContext<ScreenType>(ScreenContext);
  switch (screen) {
    case "Form":
      return <Form />;
      break;
    default:
      return <>No Modal Found</>;
      break;
  }
};

export function Model({ open, setScreen }: any) {
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={() => setScreen("")}
      open={open}
    >
      <>
        <Grid2>
          <CloseRounded
            onClick={() => setScreen("")}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              color: "whitesmoke",
              fontSize: "50px",
              cursor: "pointer",
            }}
          />{" "}
        </Grid2>
        <Body />
      </>
    </Modal>
  );
}
