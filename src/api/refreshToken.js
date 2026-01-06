// define apis for refresh token
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const REFRESH_TOKEN_URL = API_ROUTES.REFRESH_TOKEN;

export const refresh = async (refreshToken) => {


  const response = await axios.post(
    REFRESH_TOKEN_URL,
    { refresh: refreshToken },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  const data = await response.data;

  return data;
};
