export const getCurrentSessionBatch = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

  // If Month >= 6 (June to Dec): The passing batch is Year + 1.
  // If Month < 6 (Jan to May): The passing batch is Year.
  if (currentMonth >= 6) {
    return currentYear + 1;
  } else {
    return currentYear;
  }
};
