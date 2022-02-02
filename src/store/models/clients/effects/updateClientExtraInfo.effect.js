import updateClientExtraInfo from "../../../../services/updateClient.ExtraInfo";
// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, { updatedFields }, state) => {
  try {
    const { id } = state.clients.visitedClient;
    const clientsVisitingToday = state.clients.clientsVisitingToday;
    const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];

    if (targetClient) {
      Array.from(Object.keys(updatedFields)).forEach((key) => {
        targetClient.extraInfo[key] = updatedFields[key];
      });
      // updateClientInDb(clientsVisitingToday);
      updateClientExtraInfo(clientsVisitingToday, id, updatedFields);

      dispatch.clients.updatedClientExtraInfo({ clientsVisitingToday });

      dispatch.clients.getClientById({ id });
    }
  } catch (error) {
    console.log("updateClientExtraInfo", error);
  }
};
