import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayLog } from "../utils/functions";
import routes from "../Routes/Routes";
import {
  fetchAllUsers,
  updateUserPassword,
} from "../features/users/userAction";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*()_+{}\[\]:;<>?,.\/!]).*$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required("New password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({});
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setErrors({});
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await validationSchema.validate(
        { email, newPassword, confirmPassword },
        { abortEarly: false }
      );
      setErrors({});
      const existingUsers = users.filter((user) => user.email === email);
      console.log("existingUsers", existingUsers);
      if (existingUsers.length > 0) {
        const userIds = existingUsers.map((user) => user.id);
        console.log("User IDs:", userIds);

        existingUsers.forEach((user) => {
          dispatch(updateUserPassword({ ...user, password: newPassword }));
        });
        navigate(routes.SIGNIN);
      } else {
        displayLog(2, "User with this email not found.");
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
        padding: 4,
        backgroundColor: "white",
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" component="h5" gutterBottom>
          Reset Your Password
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          fullWidth
          margin="normal"
          name="email"
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          fullWidth
          margin="normal"
          name="newPassword"
          error={!!errors.newPassword}
          helperText={errors.newPassword}
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
          margin="normal"
          name="confirmPassword"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <Button variant="contained" color="primary" type="submit" fullWidth>
          Reset Password
        </Button>

        {Object.keys(errors).length > 0 && (
          <Typography variant="body2" color="error" mt={2}>
            Please fill in all required fields correctly.
          </Typography>
        )}

        <Typography variant="body2" color="textSecondary" mt={2}>
          Remembered your password? <NavLink to={routes.LOGIN}>Sign In</NavLink>
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
