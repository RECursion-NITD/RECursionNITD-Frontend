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
  // console.log("Inside search experience", Company, RoleType, search);
  const token = JSON.parse(localStorage.getItem("authTokens")).access;

  let URL;
  if (search === "") {
    if (Company === null && RoleType === null)
      URL = `${API_ROUTES.EXPERIENCES}`;
    else if (Company === null)
      URL = `${API_ROUTES.EXPERIENCES}/?role_type=${RoleType}`;
    else if (RoleType === null)
      URL = `${API_ROUTES.EXPERIENCES}/?search=${Company}`;
    else
      URL = `${API_ROUTES.EXPERIENCES}/?role_type=${RoleType}&search=${Company}`;
  } else if (Company === null && RoleType === null)
    URL = `${API_ROUTES.EXPERIENCES}/?search=${search}`;
  else if (Company === null) {
    URL = `${API_ROUTES.EXPERIENCES}/?role_type=${RoleType}&search=${search}`;
  }

  // Here is the problem (can't accomodate search and company filter together)
  else if (RoleType === null) {
    // URL=`${API_ROUTES.EXPERIENCES}/?search=${Company}&search=${search}`;  //this wouldn't work
    URL = `${API_ROUTES.EXPERIENCES}/?search=${search}`;
  } else {
    URL = `${API_ROUTES.EXPERIENCES}/?role_type=${RoleType}&search=${search}`;
    // URL=`${API_ROUTES.EXPERIENCES}/?role_type=${RoleType}&search=${search}&company=${Company}`;  (NEED SOMETHING LIKE THIS)
  }

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
