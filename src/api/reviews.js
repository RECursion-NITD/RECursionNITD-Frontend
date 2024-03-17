/* eslint-disable */
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

export const GetReviews = async (idx) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.get(API_ROUTES.EXPERIENCES + "/revisions/" + idx, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  console.log("review api called");
  console.log(data);
  return data;
};
