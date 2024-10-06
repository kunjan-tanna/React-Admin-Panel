import { apiCall } from "../../utils/common";
import { displayLog } from "../../utils/functions";
import {
  fetchProjectsFailure,
  fetchProjectsStart,
  fetchProjectsSuccess,
  deleteProjects,
  createProjects,
  fetchProjectData,
  updateProjects,
} from "./projectSlice";

export const fetchProjects = () => async (dispatch) => {
  dispatch(fetchProjectsStart());
  try {
    const response = await apiCall(
      "GET",
      "https://66fd70366993693089553341.mockapi.io/api/v1/projects"
    );
    dispatch(fetchProjectsSuccess(response));
  } catch (error) {
    dispatch(fetchProjectsFailure(error.toString()));
  }
};
export const deleteProjectList = (id) => async (dispatch) => {
  try {
    await apiCall(
      "DELETE",
      `https://66fd70366993693089553341.mockapi.io/api/v1/projects/${id}`
    );
    dispatch(deleteProjects(id));
  } catch (error) {
    console.error("Failed to delete projects", error);
  }
};
export const addProject = (formData) => async (dispatch) => {
  try {
    await apiCall(
      "POST",
      "https://66fd70366993693089553341.mockapi.io/api/v1/projects",
      formData
    );
    dispatch(createProjects(formData));
    displayLog(1, "Project Created");
  } catch (error) {
    displayLog(0, "Failed to create project");
  }
};
export const fetchProject = (id) => async (dispatch) => {
  console.log("projectIEDDDd", id);
  try {
    const response = await apiCall(
      "GET",
      `https://66fd70366993693089553341.mockapi.io/api/v1/projects/${id}`
    );
    dispatch(fetchProjectData(response));
  } catch (error) {
    displayLog(0, "Failed to get project");
  }
};
export const updateGetProject = (id, formData) => async (dispatch) => {
  console.log("projectIEDDDd", id);
  try {
    const response = await apiCall(
      "PUT",
      `https://66fd70366993693089553341.mockapi.io/api/v1/projects/${id}`,
      formData
    );
    console.log("FINAL", response);
    dispatch(updateProjects(response));
    dispatch(fetchProjects());
    displayLog(1, "Update the project data");
  } catch (error) {
    displayLog(0, "Failed to get project");
  }
};
