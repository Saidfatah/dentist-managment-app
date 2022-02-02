// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, { id }, state) => {
  try {
    const clientsVisitingToday = [...state.clients.clientsVisitingToday];
    const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
    if (targetClient) {
      targetClient.hasAttended = true;

      // updateClientInDb(clientsVisitingToday);

      dispatch.clients.confirmedClientAttendance({ clientsVisitingToday });
      // window.location.reload();
    }
  } catch (error) {
    console.log("error in : confirmClientAttendance");
    console.log(error);
  }
};
