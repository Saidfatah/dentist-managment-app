// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, { id }, state) => {
  try {
    const clientsVisitingToday = state.clients.clientsVisitingToday;

    const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
    dispatch.clients.fetchedClientByID({ visitedClient: targetClient });
  } catch (error) {
    console.log("error in : getClientById");
    console.log(error);
  }
};
