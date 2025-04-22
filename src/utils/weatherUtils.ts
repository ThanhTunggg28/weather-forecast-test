export const getWindDirection = (deg: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

export const groupForecastsByDay = (
  forecastList: any[]
): Record<string, any[]> => {
  return forecastList.reduce((days: Record<string, any[]>, item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(item);
    return days;
  }, {});
};
