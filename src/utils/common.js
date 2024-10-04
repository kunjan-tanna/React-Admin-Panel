import React from "react";
import axios from "axios";
import { displayLog } from "./functions";

export const apiCall = async (method, url, reqData) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: reqData,
    })
      .then((response) => {
        console.log("\n\n\n RESPONSE :::", response);
        let data = response.data;
        if (data.code === 201) {
          displayLog(data.code, data.message);
        } else {
          resolve(data);
        }
      })
      .catch(async (error) => {
        if (error && error.response && error.response.status === 401) {
          displayLog(0, "Session Expired, Please Login Again");
        } else {
          displayLog(0, "Network error!");
        }
        return error;
      });
  });
};
