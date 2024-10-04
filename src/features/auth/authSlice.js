import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
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
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      console.log("A", action);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
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
