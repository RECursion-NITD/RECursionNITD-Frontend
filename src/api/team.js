// define apis for team page
import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";

const TEAM_URL = API_ROUTES.TEAM;

export const getTeam = async () => {


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

  const designationPriority = {
    "President": 1,
    "Vice President": 2,
    "General Secretary": 3,
    "Treasurer": 4,
    "Convenor": 5
  };

  team[currBatchYear].sort((a, b) => {
    const priorityA = designationPriority[a.designation] || 999;
    const priorityB = designationPriority[b.designation] || 999;
    return priorityA - priorityB;
  });


  return team;
};

export const getAlumni = async (batchyear) => {

  const response = await axios.get(`${TEAM_URL}/?batch_year=${batchyear}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.data;

  return data;
};
