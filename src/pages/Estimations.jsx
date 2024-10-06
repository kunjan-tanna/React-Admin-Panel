import React, { useState, useEffect } from "react";
import { Grid, Container, TextField } from "@mui/material";
import Header from "../components/estimations/Header";
import EstimationList from "../components/estimations/EstimationList";
import { useDispatch, useSelector } from "react-redux";
import { fetchEstimations } from "../features/estimations/estimationActions";

function Estimations() {
  const { estimations, loading, error } = useSelector(
    (state) => state.estimations
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEstimations());
  }, [dispatch]);
  console.log(estimations);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  const filteredProjects = estimations.filter((project) => {
    return (
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.unit.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedEstimations = filteredProjects?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <Container maxWidth="lg">
      <Header
        title={"Estimates"}
        btnName={"Add Estimate"}
        nagivateLink={true}
      />
      <TextField
        label="Search Estimation by title and unit"
        variant="filled"
        value={searchQuery}
        fullWidth
        onChange={handleSearchChange}
        sx={{ marginBottom: 1, ml: 1, background: "white" }}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <EstimationList
          estimations={paginatedEstimations}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {error && <div>{error}</div>}
    </Container>
  );
}

export default Estimations;
