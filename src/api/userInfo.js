/* eslint-disable */
// define apis for profile page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";
import jwtDecode from "jwt-decode";

const USER_URL = API_ROUTES.USERS;

export const getProfile = async () => {
  let username = null;
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.username) {
        username = parsedUser.username;
      }
    } catch (e) {}
  }

  if (!username) {
    const authTokens = localStorage.getItem("authTokens");
    if (authTokens) {
      try {
        const parsedTokens = JSON.parse(authTokens);
        if (parsedTokens?.access) {
          const decoded = jwtDecode(parsedTokens.access);
          if (decoded?.username) {
            username = decoded.username;
          } else if (decoded?.email) {
            username = decoded.email.split("@")[0];
          }
        }
      } catch (e) {}
    }
  }

  if (!username) {
    throw new Error("User not found in local storage");
  }

  const response = await axios.get(`${USER_URL}/${username}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;

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


  return data;
};

export const getUserProfile = async (username) => {
  const response = await axios.get(`${USER_URL}/${username}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  return data;
};