/* eslint-disable */
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

export const GetExperiences = async () => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.get(API_ROUTES.EXPERIENCES, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};


//Not written in axios beacuse next is having the whole link. Should try to think of an approach.

export const GetNextExperiences = async (next) =>{
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await fetch(
    next,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
