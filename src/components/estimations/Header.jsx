import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../Routes/Routes";

function Header({ title, btnName, nagivateLink = false }) {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{ background: "white", color: "black", margin: "10px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            nagivateLink
              ? navigate(routes.ADDESTIMATION)
              : navigate(routes.ADDPROJECT)
          }
        >
          {btnName}
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
