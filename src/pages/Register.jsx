import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import routes from "../Routes/Routes";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authActions";
import { displayLog } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({}); // Clear error on change
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*()_+{}\[\]:;<>?,.\/!]).*$/
      )
      .required("Password is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log(formData);
      dispatch(registerUser(formData));
      setErrors({});
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };
  if (isAuthenticated) {
    navigate("/signin");
  }
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
          Create an account to continue
        </Typography>
        <TextField
          label="Email address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          name="email"
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          name="username"
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          name="password"
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />

        <Button
          sx={{ marginTop: "10px", width: "50%" }}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          disabled={Object.keys(errors).length > 0}
        >
          Sign Up
        </Button>

        {Object.keys(errors).length > 0 && (
          <Typography variant="body2" color="error" mt={2}>
            Please fill in all required fields.
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" mt={2}>
          Already have an account? <NavLink to={routes.SIGNIN}>Login</NavLink>
        </Typography>
      </Box>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}  
      {isAuthenticated && displayLog(1, "Register Success")}
    </Box>
  );
};

export default Register;
