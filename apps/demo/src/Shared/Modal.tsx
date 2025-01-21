import { Grid2, Modal } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseRounded } from "@mui/icons-material";
import Form from "./Modals/Form";
import EditProfileModal from "./Modals/EditProfileModal";
import { ScreenContext, ScreenType } from "./Context/ScreenContext";

const Body = () => {
  const { screen } = useContext<ScreenType>(ScreenContext);
  switch (screen) {
    case "Form":
      return <Form />;
      break;
    case "EditProfile":
      return <EditProfileModal key={uuidv4()} />;
      break;
    default:
      return <>No Modal Found</>;
      break;
  }
};

export function Model({ open, setScreen }: any) {
  return (
    <Modal
      key={uuidv4()}
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
