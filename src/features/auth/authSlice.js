import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("isAuthenticated", true);
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
      localStorage.setItem("isAuthenticated", false);
    },
    registerSuccess: (state, action) => {
      console.log("A", action);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("isAuthenticated", true);
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
      localStorage.setItem("isAuthenticated", false);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("estimationList");
      localStorage.removeItem("projectsList");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
