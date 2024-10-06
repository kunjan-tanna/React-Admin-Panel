import React, { useState, useEffect } from "react";
import { Grid, Container, TextField } from "@mui/material";
import Header from "../components/estimations/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../features/projects/projectActions";
import ProjectList from "../components/projects/ProjectList";

function Projects() {
  const { projects, loading, error } = useSelector((state) => state.projects);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;
  console.log("searchQuery", searchQuery);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  const filteredProjects = projects.filter((project) => {
    return (
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <Container maxWidth="lg">
      <Header title={"Projects"} btnName={"Add Project"} />
      <TextField
        label="Search Projects by projectName and email"
        variant="filled"
        value={searchQuery}
        fullWidth
        onChange={handleSearchChange}
        sx={{ marginBottom: 1, ml: 1, background: "white" }}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProjectList
          projects={paginatedProjects}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {error && <div>{error}</div>}
    </Container>
  );
}

export default Projects;
