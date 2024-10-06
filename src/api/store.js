import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import estimationReducer from "../features/estimations/estimationSlice";
import projectReducer from "../features/projects/projectSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    estimations: estimationReducer,
    projects: projectReducer,
  },
});
