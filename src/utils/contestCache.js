const CACHE_KEY = "contest_notifications_cache_v2";

const getISTParts = (date = new Date()) => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const read = (type) =>
    Number(parts.find((part) => part.type === type)?.value || 0);

  return {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: read("hour"),
    minute: read("minute"),
    second: read("second"),
  };
};

export const getLastRefreshBoundary = (date = new Date()) => {
  const { year, month, day, hour, minute } = getISTParts(date);
  let boundaryYear = year;
  let boundaryMonth = month;
  let boundaryDay = day;

  if (hour === 0 && minute < 1) {
    const previousDay = new Date(Date.UTC(year, month - 1, day));
    previousDay.setUTCDate(previousDay.getUTCDate() - 1);
    boundaryYear = previousDay.getUTCFullYear();
    boundaryMonth = previousDay.getUTCMonth() + 1;
    boundaryDay = previousDay.getUTCDate();
  }

  return Date.UTC(boundaryYear, boundaryMonth - 1, boundaryDay, 0, 1, 0) -
    5.5 * 60 * 60 * 1000;
};

export const isContestCacheValid = (cachedAt) => {
  if (!cachedAt) {
    return false;
  }

  const cachedTime = new Date(cachedAt).getTime();
  return cachedTime >= getLastRefreshBoundary();
};

export const readContestCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!isContestCacheValid(parsed.cached_at)) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

export const writeContestCache = (payload) => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      cached_at: payload.cached_at,
      refresh_boundary: payload.refresh_boundary,
      contests: payload.contests || [],
    })
  );
};

export const clearContestCache = () => {
  localStorage.removeItem(CACHE_KEY);
};
