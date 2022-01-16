const format = (item) => (item < 10 ? `0${item}` : item);

export const getMonth = (date) => date.getMonth() + 1;
export const getDay = (date) => date.getDate();
export const getyear = (date) => date.getFullYear();

const dateFormater = (date) => {
  const year = getyear(date);
  let month = getMonth(date);
  let day = getDay(date);

  month = format(month);
  day = format(day);

  return `${day}/${month}/${year}`;
};

export default dateFormater;
