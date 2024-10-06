import React, { useEffect } from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/users/userAction";
import { fetchEstimations } from "../features/estimations/estimationActions";
import { fetchProjects } from "../features/projects/projectActions";

import ProjectChart from "../components/dashboard/ProjectChart";
import EstimationChart from "../components/dashboard/EstimationChart";
import UserChart from "../components/dashboard/UserChart";

function Dashboard() {
  const dispatch = useDispatch();

  const { projects } = useSelector((state) => state.projects);
  const { estimations } = useSelector((state) => state.estimations);
  // const { users } = useSelector((state) => state.users);
  const { users, loading, error } = useSelector((state) => state.users);

  console.log("projects", users);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchEstimations());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6">Projects Overview</Typography>
            <ProjectChart projects={projects} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6">Estimations Overview</Typography>
            <EstimationChart estimations={estimations} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h6">Users Overview</Typography>
            <UserChart users={users} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
