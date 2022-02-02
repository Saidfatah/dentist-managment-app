import updateClientPersonalInfo from "../../../../services/updateClient.PersonalInfo";
// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, { updatedFields }, state) => {
  try {
    const { id } = state.clients.visitedClient;
    const clientsVisitingToday = state.clients.clientsVisitingToday;
    const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];

    if (targetClient) {
      Array.from(Object.keys(updatedFields)).forEach((key) => {
        targetClient.perosnalInfo[key] = updatedFields[key];
      });

      updateClientPersonalInfo(clientsVisitingToday, id, updatedFields);

      dispatch.clients.updatedClientPersonalInfo({ clientsVisitingToday });

      dispatch.clients.getClientById({ id });
    }
  } catch (error) {
    console.log("updateClientInfo", error);
  }
};
