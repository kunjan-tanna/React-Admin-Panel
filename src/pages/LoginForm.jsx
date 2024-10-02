import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  Box,
  Link,
} from "@mui/material";
import routes from "../Routes/Routes";
import { NavLink } from "react-router-dom";

const LoginForm = () => {
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
          Login to Account
        </Typography>
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
        />
        <Link
          href="/forgot-password"
          style={{ textDecoration: "underline", float: "right" }}
        >
          Forgot Password?
        </Link>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
          margin="normal"
        />
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color="primary"
          />
          <Typography variant="body2">Remember Password</Typography>
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Sign In
        </Button>
        <Typography variant="body2" color="textSecondary" mt={2}>
          Don't have an account?{" "}
          <NavLink to={routes.SIGNUP}>Create Account</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
