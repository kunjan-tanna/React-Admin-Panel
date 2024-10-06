import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: JSON.parse(localStorage.getItem("projectsList")) || [],
  loading: false,
  error: null,
  getProject: {},
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    fetchProjectsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProjectsSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
      state.getProject = {};
      localStorage.setItem("projectsList", JSON.stringify(state.projects));
    },
    fetchProjectsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    createProjects: (state, action) => {
      state.projects.push(action.payload);
    },

    updateProjects: (state, action) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    fetchProjectData: (state, action) => {
      state.getProject = action.payload;
    },

    deleteProjects: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
  },
});

export const {
  fetchProjectsStart,
  fetchProjectsSuccess,
  fetchProjectsFailure,
  createProjects,
  updateProjects,
  deleteProjects,
  fetchProjectData,
} = projectSlice.actions;

export default projectSlice.reducer;
