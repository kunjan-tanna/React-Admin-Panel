import React, { useState, useEffect } from "react";
import { Grid, Container } from "@mui/material";
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
  const itemsPerPage = 5;
  const totalPages = Math.ceil(estimations.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedEstimations = estimations?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <Container maxWidth="lg">
      <Header />
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
