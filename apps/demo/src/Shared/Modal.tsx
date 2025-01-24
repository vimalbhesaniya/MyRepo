import { Grid2, Modal } from "@mui/material";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseRounded } from "@mui/icons-material";
import Form from "./Modals/Form";
import EditProfileModal from "./Modals/EditProfileModal";
import { ScreenContext, ScreenType } from "./Context/ScreenContext";

type Body = {
  [key: string]: React.JSX.Element | null;
};

const children: Body = {
  Form: <Form />,
  EditProfile: <EditProfileModal />,
};  

export function Model() {
  const { screen, setScreen } = useContext<ScreenType>(ScreenContext);
  return (
    <Modal
      key={uuidv4()}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClose={() => setScreen("")}
      open={Boolean(screen)}
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
        {screen ? children[screen] : null}
      </>
    </Modal>
  );
}
