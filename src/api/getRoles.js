/* eslint-disable */
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const ROLES_URL = API_ROUTES.ROLES;

export const getProfileRoles = async (id) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.post(
    ROLES_URL,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data;
  console.log("roles data : ", data);
  return data;
};
