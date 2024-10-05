import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      sx={{ background: "white", color: "black", margin: "10px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Estimates
        </Typography>
        <Button variant="contained" color="primary">
          Add Estimate
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
