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

// Not written in axios because next is having the whole link. Should try to think of an approach.

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

  return data;
};
export const SearchExp = async (Company, RoleType, search) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;

  const params = new URLSearchParams();
  
  if (search && search.trim() !== "") {
    params.append("search", search);
  }
  
  if (Company && Company !== "Company") {
    // Reverting to use 'search' param for Company as backend likely relies on generic search.
    // We append it. If 'search' is already there, this adds a second 'search' param.
    // If the backend only processes the last one, we might need to combine them.
    // But let's try appending first (standard HTTP behavior).
    // If the user wants to search "Microsoft" (Company) AND "Intern" (Text),
    // we want results that match BOTH?
    // The previous code had a specific branch `URL = ...search=${Company}` when text search was empty.
    
    // Strategy: If we have a text search, let's prepend/append the company name to it to form a combined query?
    // Or just use 'search' param for it.
    
    // Let's assume sending it as 'search' is correct.
    params.append("search", Company); 
  }

  if (RoleType && RoleType !== "All") {
    params.append("role_type", RoleType);
  }

  const URL = `${API_ROUTES.EXPERIENCES}/?${params.toString()}`;
  
  const response = await axios.get(URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;

  return data;
};

export const createExperience = async (userData) => {

  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.post(`${API_ROUTES.EXPERIENCES}/`,userData , {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;

  return data;
};

export const updateExperience = async (id, userData) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.patch(`${API_ROUTES.EXPERIENCES}/${id}/`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

export const approveExperience = async (id) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.post(`${API_ROUTES.EXPERIENCES}/${id}/revisions/acc/`, {}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};

export const rejectExperience = async (id, message) => {
  const token = JSON.parse(localStorage.getItem("authTokens")).access;
  const response = await axios.post(`${API_ROUTES.EXPERIENCES}/${id}/revisions/chg/`, { message }, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.data;
  return data;
};
