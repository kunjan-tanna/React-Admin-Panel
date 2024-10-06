import React from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Pagination,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteEstimations } from "../../features/estimations/estimationActions";

function EstimationList({
  estimations,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const dispatch = useDispatch();
  const onEditClick = (id) => {
    console.log(id);
    // dispatch(updateEstimation(id));
  };
  const onDeleteClick = (id) => {
    console.log(id);
    dispatch(deleteEstimations(id));
  };
  return (
    <>
      <TableContainer
        component={Paper}
        className="estimation-list"
        sx={{ ml: 1 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Margin</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimations.map((estimation) => (
              <TableRow key={estimation.id}>
                <TableCell>{estimation.id}</TableCell>
                <TableCell>{estimation.title}</TableCell>
                <TableCell>{estimation.description}</TableCell>
                <TableCell>{estimation.quantity}</TableCell>
                <TableCell>{estimation.unit}</TableCell>
                <TableCell>{estimation.price}</TableCell>
                <TableCell>{estimation.margin}</TableCell>
                <TableCell>{estimation.total}</TableCell>
                <TableCell>
                  {new Date(estimation.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onEditClick(estimation.id)}
                    sx={{ mr: 1 }}
                    disabled
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => onDeleteClick(estimation.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => onPageChange(page)}
          color="primary"
        />
      </Box>
    </>
  );
}

export default EstimationList;
