import { Stack } from "@mui/material";
import React from "react";
import TableUI, { TableUIProps } from "./TableUI";

export function Table({ cells, rows, isPending, Actions }: TableUIProps) {
  return (
    <>
      <Stack>
        <TableUI
          cells={cells}
          rows={rows}
          isPending={isPending}
          Actions={Actions}
        />
      </Stack>
    </>
  );
}
