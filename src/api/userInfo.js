// define apis for team page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const USER_URL = API_ROUTES.USERS;

export const getTeam = async () => {
  console.log("users api called");
  const response = await axios.get(USER_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  console.log("data", data);
  return data;

};
