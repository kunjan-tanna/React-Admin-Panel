import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { displayLog } from "../utils/functions";
import { fetchAllUsers } from "../features/users/userAction";
import routes from "../Routes/Routes";
import { loginSuccess } from "../features/auth/authSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const { users } = useSelector((state) => state.users);
  console.log("LOGIN", users);
  const [errors, setErrors] = useState({});

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({});
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({});
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  // Validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*()_+{}\[\]:;<>?,.\/!]).*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required("Password is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validate email and password
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      setErrors({});

      const existingUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (existingUser) {
        displayLog(1, "Login Success");
        dispatch(loginSuccess(existingUser));
        navigate(routes.DASHBOARD);
      } else {
        displayLog(2, "User not found. Please create a new account.");
        navigate(routes.SIGNUP);
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
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
        margin: "0 auto",
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
          name="email"
          error={!!errors.email}
          helperText={errors.email}
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
          name="password"
          error={!!errors.password}
          helperText={errors.password}
        />
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color="primary"
          />
          <Typography variant="body2">Remember Password</Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={Object.keys(errors).length > 0}
        >
          Sign In
        </Button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {Object.keys(errors).length > 0 && (
          <Typography variant="body2" color="error" mt={2}>
            Please fill in all required fields.
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" mt={2}>
          Don't have an account?{" "}
          <NavLink to={routes.SIGNUP}>Create Account</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
