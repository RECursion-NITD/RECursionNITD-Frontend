// define apis for team page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const TEAM_URL = API_ROUTES.TEAM;

export const getTeam = async () => {
  console.log("team api called");

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  let currBatchYear;

  if (month >= 6 && month <= 12) {
    currBatchYear = year + 1;
  } else {
    currBatchYear = year;
  }

  const team = {};
  team[currBatchYear] = [];
  team[currBatchYear + 1] = [];
  team[currBatchYear + 2] = [];

  const response = await axios.get(TEAM_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;

  data.forEach((member) => {
    if (member.batch_year === currBatchYear) {
      team[currBatchYear].push(member);
    } else if (member.batch_year === currBatchYear + 1) {
      team[currBatchYear + 1].push(member);
    } else if (member.batch_year === currBatchYear + 2) {
      team[currBatchYear + 2].push(member);
    }
  });

  console.log(team);
  return team;
};

export const getAlumni = async (batchyear) => {
  console.log("Inside get alumni function");
  const response = await axios.get(`${TEAM_URL}/?batch_year=${batchyear}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;
  console.log("alumni", data);
  return data;
};
