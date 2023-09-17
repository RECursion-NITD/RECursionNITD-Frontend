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
  console.log("experiences api called");
  return data;
};

//Not written in axios because next is having the whole link. Should try to think of an approach.

export const GetNextExperiences = async (next) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await fetch(next, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const GetDetailExperience = async (experienceId) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.get(
    `${API_ROUTES.EXPERIENCES}/${experienceId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.data;
  console.log("detailed experience api called");
  console.log(data);
  return data;
};
