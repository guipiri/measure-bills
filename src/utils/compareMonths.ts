export function compareMonths(date: Date, dates: Date[]) {
  const month = date.getMonth();
  const year = date.getFullYear();
  return dates.reduce(
    (prev, curr) =>
      prev || (month === curr.getMonth() && year === curr.getFullYear()),
    false,
  );
}
