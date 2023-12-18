/* eslint-disable */
// define apis for profile page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const USER_URL = API_ROUTES.USERS;

export const getProfile = async () => {
  const user = localStorage.getItem("user");
  const username = JSON.parse(user).username;
  const response = await axios.get(`${USER_URL}/${username}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  console.log("data", data);
  return data;
};

export const editProfile = async (profileData) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const username = JSON.parse(localStorage.getItem("user")).username;
  const response = await axios.patch(`${USER_URL}/${username}/`, profileData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  console.log("create event api called");
  console.log(data);
  return data;
};