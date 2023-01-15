// define apis for events page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const EVENTS_URL = API_ROUTES.EVENTS;

export const getEvents = async () => {
  console.log("events api called");
  const response = await axios.get(EVENTS_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  console.log("events data", data);
  return data;
};

export const getNextEvents = async (next) => {
  const response = await fetch(next, {
    method: "GET",
    headers: {
      "Content-Type": "application.json",
    },
  });
  const data = await response.json();
  return data;
};
