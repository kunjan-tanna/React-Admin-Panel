import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import routes from "../Routes/Routes";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        width: "40vw",
        borderRadius: 8,
        padding: 4,
        backgroundColor: "white",
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h5" gutterBottom>
          Create an Account
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Create a account to continue
        </Typography>
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          type="text"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />

        <Button
          sx={{ marginTop: "10px", width: "50%" }}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
        >
          Sign Up
        </Button>
        <Typography variant="body2" color="textSecondary" mt={2}>
          Already have an account? <NavLink to={routes.SIGNIN}>Login</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
