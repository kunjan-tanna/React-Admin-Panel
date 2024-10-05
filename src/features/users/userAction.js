// src/features/users/userActions.js
import axios from "axios";
import {
  fetchUsersPending,
  fetchUsersSuccess,
  fetchUsersFailed,
  updateUserPasswordSuccess,
  userUpdateFail,
} from "./userSlice";
import { apiCall } from "../../utils/common";

export const fetchAllUsers = () => async (dispatch) => {
  dispatch(fetchUsersPending()); // Dispatch pending action
  try {
    const response = await apiCall(
      "GET",
      "https://66fd70366993693089553341.mockapi.io/users"
    );
    console.log("RES", response);
    dispatch(fetchUsersSuccess(response)); // Dispatch success action with data
  } catch (error) {
    dispatch(fetchUsersFailed(error.response || "Failed to fetch users")); // Dispatch error action
  }
};

export const updateUserPassword =
  (updatedUser) => async (dispatch, getState) => {
    try {
      const response = await apiCall(
        "PUT",
        `https://66fd70366993693089553341.mockapi.io/users/${updatedUser.id}`,
        updatedUser
      );
      dispatch(updateUserPasswordSuccess(response));
    } catch (error) {
      dispatch(userUpdateFail(error.message));
    }
  };
