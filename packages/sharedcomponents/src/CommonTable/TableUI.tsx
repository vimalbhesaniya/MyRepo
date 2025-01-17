import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@mui/material";
export type TableUIProps = {
  rows: any[];
  cells: string[];
  isPending?: boolean;
  handleDelete?: (id: any) => void;
  keyToDelete?: any;
  Actions?: (row: any) => JSX.Element;
};

const TableUI = ({ rows, cells, isPending, Actions }: TableUIProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <>
            <TableRow>
              {cells.length > 0 && (
                <>
                  {cells?.map((cell) => {
                    return <TableCell key={uuidv4()}>{cell}</TableCell>;
                  })}
                  <TableCell>Actions</TableCell>
                </>
              )}
            </TableRow>
          </>
        </TableHead>
        <TableBody>
          {isPending && (
            <TableRow>
              <TableCell align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {rows?.length > 0 ? (
            rows?.map((row, index) => {
              return (
                <TableRow key={uuidv4()}>
                  {cells.map((cell) => (
                    <TableCell key={uuidv4()} align="left">
                      {row[cell || ""]}
                    </TableCell>
                  ))}
                  <TableCell align="left">
                    {Actions ? Actions(row) : null}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell align="left">No Data found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUI;
