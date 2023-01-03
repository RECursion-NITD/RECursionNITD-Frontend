// define apis for team page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const TEAM_URL = API_ROUTES.TEAM;

export const getTeam = async () => {
  console.log("team api called");
  const response = await axios.get(TEAM_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  console.log("data", data);
  return data;
};
