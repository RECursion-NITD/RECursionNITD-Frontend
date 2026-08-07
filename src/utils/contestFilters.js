export const shouldIncludeContest = (contest) => {
  const platform = contest?.platform;
  const name = (contest?.name || "").toLowerCase();

  if (platform === "codeforces") {
    return true;
  }
  if (platform === "codechef") {
    return name.includes("starter");
  }
  if (platform === "atcoder") {
    return name.includes("beginner");
  }

  return true;
};

export const filterRelevantContests = (contests = []) =>
  contests.filter(shouldIncludeContest);
