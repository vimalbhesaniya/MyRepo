import { ModalProps } from "@mui/material";
import { JSXElementConstructor, ReactNode } from "react";

export interface ModalType extends ModalProps {
  open: boolean;
  onClose: () => {};
  Body: JSX.Element;
}
