export const getTimelineScale = (type) => {
  if (type === "week") return 50;
  if (type === "month") return 25;
  return 8; // year
};
