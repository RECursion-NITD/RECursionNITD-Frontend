import axios from "./axios";

export const getLeaderboard = async ({
  platform = "codeforces",
  search = "",
  batch = "",
  showInactive = false,
} = {}) => {
  const params = {};
  if (platform) params.platform = platform;
  if (search) params.search = search;
  if (batch && batch !== "all") params.batch = batch;
  if (showInactive) params["show_inactive"] = "true";

  const response = await axios.get("/leaderboard/", { params });
  return response.data;
};

export const refreshLeaderboard = async () => {
  const response = await axios.post("/leaderboard/refresh/");
  return response.data;
};

export const getLeaderboardCooldown = async () => {
  const response = await axios.get("/leaderboard/cooldown/");
  return response.data;
};
