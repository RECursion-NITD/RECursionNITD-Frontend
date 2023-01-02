// define apis for team page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const TEAM_URL = API_ROUTES.TEAM;

export const getTeam = async () => {
  const response = await axios.get(TEAM_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log("data", data);
};
