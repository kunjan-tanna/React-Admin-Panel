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
import { deleteProjectList } from "../../features/projects/projectActions";
import { useNavigate } from "react-router-dom";
import routes from "../../Routes/Routes";

function ProjectList({ projects, currentPage, totalPages, onPageChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onEditClick = (id) => {
    navigate(`/add-project/${id}`);
  };

  const onDeleteClick = (id) => {
    console.log(id);
    dispatch(deleteProjectList(id));
  };

  return (
    <>
      <TableContainer component={Paper} className="project-list" sx={{ ml: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Reference Number</TableCell>
              <TableCell>Project Number</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Area Location</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.customer}</TableCell>
                <TableCell>{project.referenceNo}</TableCell>
                <TableCell>{project.projectNo}</TableCell>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.areaLocation}</TableCell>
                <TableCell>{project.address}</TableCell>
                <TableCell>
                  {new Date(project.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{project.contact}</TableCell>
                <TableCell>{project.email}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => onEditClick(project.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => onDeleteClick(project.id)}
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

export default ProjectList;
