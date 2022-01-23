const format = (item) => (item < 10 ? `0${item}` : item);

export const getMonth = (date = new Date()) => date.getMonth() + 1;
export const getDay = (date = new Date()) => date.getDate();
export const getyear = (date = new Date()) => date.getFullYear();

export const isSameDate = (date1, date2 = new Date()) => {
  if (date1 !== formatDate(date2)) return false;

  return true;
};
export const formatDate = (date) => {
  const year = getyear(date);
  let month = getMonth(date);
  let day = getDay(date);

  month = format(month);
  day = format(day);

  return `${day}_${month}_${year}`;
};
