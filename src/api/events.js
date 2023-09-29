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

export const FilterSearchEvents = async (EventType, SearchQuery) => {
  if (EventType === "All") {
    if (SearchQuery === "") {
      const response = await axios.get(EVENTS_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      console.log("events data", data);
      return data;
    } else {
      const response = await axios.get(`${EVENTS_URL}/?search=${SearchQuery}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      console.log("search events data", data);
      return data;
    }
  } else if (SearchQuery === "") {
    const response = await axios.get(`${EVENTS_URL}/?event_type=${EventType}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.data;
    console.log("events data", data);
    return data;
  } else {
    const response = await axios.get(
      `${EVENTS_URL}/?event_type=${EventType}&search=${SearchQuery}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.data;
    console.log("events data", data);
    return data;
  }
};

// export const getClassEvents = async () => {
//   console.log("Class events api called");
//   const response = await axios.get(EVENTS_URL, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.data;
//   console.log(" class events data", data);
//   return data;
// };

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

export const GetDetailEvent = async (eventId) => {
  const response = await axios.get(`${EVENTS_URL}/${eventId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  console.log("detailed events api called");
  console.log(data);
  return data;
};
