// define apis for home page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const HOME_URL = API_ROUTES.HOME;

export const getHome = async () => {

  const response = await axios.get(HOME_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;

  return data;
};
