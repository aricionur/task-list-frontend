export const formatDate = (date: string | undefined) =>
  date &&
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
