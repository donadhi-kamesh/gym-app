export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const calculateProgress = (before: number, after: number, current: number): number => {
  const total = before - after;
  const achieved = before - current;
  return Math.round((achieved / total) * 100);
};
