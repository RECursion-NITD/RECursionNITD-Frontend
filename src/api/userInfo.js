/* eslint-disable */
// define apis for profile page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const USER_URL = API_ROUTES.USERS;

export const getProfile = async () => {
  const user = localStorage.getItem("user");
  if (!user) {
    throw new Error("User not found in local storage");
  }
  const parsedUser = JSON.parse(user);
  if (!parsedUser || !parsedUser.username) {
    throw new Error("Invalid user data in local storage");
  }
  const username = parsedUser.username;

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
  const authTokens = localStorage.getItem("authTokens");
  const user = localStorage.getItem("user");

  if (!authTokens || !user) {
    throw new Error("Missing auth tokens or user data");
  }

  const token = JSON.parse(authTokens).access;
  const username = JSON.parse(user).username;

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