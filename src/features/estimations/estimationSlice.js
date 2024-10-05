import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  estimations: JSON.parse(localStorage.getItem("estimationList")) || [],
  loading: false,
  error: null,
};

const estimationSlice = createSlice({
  name: "estimations",
  initialState,
  reducers: {
    fetchEstimationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEstimationsSuccess: (state, action) => {
      state.loading = false;
      state.estimations = action.payload;
      localStorage.setItem("estimationList", JSON.stringify(state.estimations));
    },
    fetchEstimationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createEstimation: (state, action) => {
      state.estimations.push(action.payload);
    },

    updateEstimation: (state, action) => {
      const index = state.estimations.findIndex(
        (estimation) => estimation.id === action.payload.id
      );
      if (index !== -1) {
        state.estimations[index] = action.payload;
      }
    },

    deleteEstimation: (state, action) => {
      state.estimations = state.estimations.filter(
        (estimation) => estimation.id !== action.payload
      );
    },
  },
});

export const {
  fetchEstimationsStart,
  fetchEstimationsSuccess,
  fetchEstimationsFailure,
  createEstimation,
  updateEstimation,
  deleteEstimation,
} = estimationSlice.actions;

export default estimationSlice.reducer;
