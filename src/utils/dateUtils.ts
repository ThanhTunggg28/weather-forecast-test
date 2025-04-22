export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
};

export const getDateFromForecast = (dtTxt: string): string => {
  return dtTxt.split(' ')[0];
};
