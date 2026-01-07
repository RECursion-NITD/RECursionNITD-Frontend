// define apis for events page
/* eslint-disable */
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const GET_STARTED_URL = API_ROUTES.GET_STARTED;

export const getContents = async () => {

  const responsePage1 = await axios.get(`${GET_STARTED_URL}/contents/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responsePage2 = await axios.get(`${GET_STARTED_URL}/contents/?page=2`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // process the results and consolidate into a single array
  // this is done because api response was not sorted by level.Number
  const results = [
    ...responsePage1.data.results,
    ...responsePage2.data.results,
  ];
  results.sort((level1, level2) => level1.Number - level2.Number);
  return results;
};

export const getSubTopicDetails = async (subTopic) => {

  const response = await axios.get(`${GET_STARTED_URL}/${subTopic}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
