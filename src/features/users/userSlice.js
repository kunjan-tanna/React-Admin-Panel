import { createSlice } from "@reduxjs/toolkit";
import { displayLog } from "../../utils/functions";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersPending: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    },
    fetchUsersFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserPasswordSuccess: (state, action) => {
      console.log("UPDATE", action.payload);
      state.users = action.payload;
      displayLog(1, "Password reset successful.");
    },
    userUpdateFail: (state, action) => {
      state.error = action.payload;
      displayLog(2, "Failed to update password.");
    },
  },
});

export const {
  fetchUsersPending,
  fetchUsersSuccess,
  fetchUsersFailed,
  updateUserPasswordSuccess,
  userUpdateFail,
} = userSlice.actions;

export default userSlice.reducer;
