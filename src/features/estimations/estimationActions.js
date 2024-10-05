import {
  deleteEstimation,
  fetchEstimationsFailure,
  fetchEstimationsStart,
  fetchEstimationsSuccess,
} from "./estimationSlice";
import { apiCall } from "../../utils/common";

export const fetchEstimations = () => async (dispatch) => {
  dispatch(fetchEstimationsStart());
  try {
    const response = await apiCall(
      "GET",
      "https://66fd7d2d6993693089555dc1.mockapi.io/api/v1/estimations"
    );
    dispatch(fetchEstimationsSuccess(response));
  } catch (error) {
    dispatch(fetchEstimationsFailure(error.toString()));
  }
};
export const deleteEstimations = (id) => async (dispatch) => {
  try {
    await apiCall(
      "DELETE",
      `https://66fd7d2d6993693089555dc1.mockapi.io/api/v1/estimations/${id}`
    );
    dispatch(deleteEstimation(id));
  } catch (error) {
    console.error("Failed to delete estimation", error);
    //dispatch(fetchEstimationsFailure(error.toString()));
  }
};
