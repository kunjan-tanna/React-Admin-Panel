import axios from "axios";
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  setLoading,
} from "./authSlice";
import { apiCall } from "../../utils/common";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await apiCall(
      "POST",
      "https://66fd70366993693089553341.mockapi.io/users",
      userData
    );
    console.log("RES", response);
    dispatch(registerSuccess(response));
  } catch (error) {
    dispatch(registerFailure(error.response.message));
  } finally {
    dispatch(setLoading(false));
  }
};
