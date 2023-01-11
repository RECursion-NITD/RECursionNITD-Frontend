/* eslint-disable */
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

export const GetExperiences = async (route) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access; //Getting token from local storage
  var Link = API_ROUTES.EXPERIENCES; // Default route for page-1 
  if(route!=="") Link+=route; // adding a new route to the default route
  const response = await axios.get(Link, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  console.log("experiences api called")
  return data;
};
