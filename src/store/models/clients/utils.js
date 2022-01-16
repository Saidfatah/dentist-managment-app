import { getDay, getMonth, getyear } from "../../../utils/formatDate";

export const isVisitingToday = (client) => {
  const { appointments } = client;
  const todaysDate = new Date();
  const today = getDay(todaysDate);
  const thisMonth = getMonth(todaysDate);
  const thisYear = getyear(todaysDate);

  const TodaysAppointment = appointments.filter((a) => {
    const appointmentDay = getDay(todaysDate);
    const appointmentMonth = getMonth(todaysDate);
    const appointmentYear = getyear(todaysDate);
    if (
      today !== appointmentDay ||
      thisMonth !== appointmentMonth ||
      thisYear !== appointmentYear
    )
      return false;
    return true;
  })[0];

  if (TodaysAppointment) return true;
  return false;
};

export const isOrthoClient = (client) => client.perosnalInfo.isOrthoClient;
export const isNormalClient = (client) => !client.perosnalInfo.isOrthoClient;
