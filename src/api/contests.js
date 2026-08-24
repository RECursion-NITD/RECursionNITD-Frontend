import axios from "./axios";
import { API_ROUTES } from "../utils/api_routes";
import {
  readContestCache,
  writeContestCache,
} from "../utils/contestCache";
import { filterRelevantContests } from "../utils/contestFilters";
const CONTESTS_URL = API_ROUTES.CONTESTS;

const filterByPlatform = (contests, platform) => {
  const relevantContests = filterRelevantContests(contests);
  if (!platform) {
    return relevantContests;
  }
  return relevantContests.filter((contest) => contest.platform === platform);
};
export const getContestNotifications = async (platform = null) => {
  const cached = readContestCache();
  if (cached) {
    return {
      cached_at: cached.cached_at,
      refresh_boundary: cached.refresh_boundary,
      contests: filterByPlatform(cached.contests, platform),
      from_browser_cache: true,
    };
  }

  const response = await axios.get(CONTESTS_URL);
  const data = response.data;
  writeContestCache(data);

  return {
    cached_at: data.cached_at,
    refresh_boundary: data.refresh_boundary,
    contests: filterByPlatform(data.contests || [], platform),
    from_browser_cache: false,
  };
};
