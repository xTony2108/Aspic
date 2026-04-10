export const calculateDiffDays = (
  dateToSubtract: Date,
  biggerDate: Date = new Date(),
): number => {
  const date1 = dateToSubtract;
  const date2 = biggerDate;

  const diffMs = date2.getTime() - date1.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
};
