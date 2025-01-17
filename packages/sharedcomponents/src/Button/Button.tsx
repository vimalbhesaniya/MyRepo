import {
  Button,
  ButtonProps,
  ButtonTypeMap,
  ExtendButtonBase,
  Grid2,
} from "@mui/material";

interface Props extends ButtonProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  onClick: () => void;
}

export function ButtonField({ text, onClick, type, ...props }: Props) {
  return (
    <Grid2>
      <Button
        type={type}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        {...props}
      >
        {text}
      </Button>
    </Grid2>
  );
}
