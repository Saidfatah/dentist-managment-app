import getClientByIdService from "../../../../services/getClientByID";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, { id }, state) => {
  try {
    const clientsVisitingToday = state.clients.clientsVisitingToday;
    let targetClient;
    targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
    if (!undefined) targetClient = await getClientByIdService(id);
    console.log(targetClient);
    dispatch.clients.fetchedClientByID({ visitedClient: targetClient });
  } catch (error) {
    console.log("error in : getClientById");
    console.log(error);
  }
};
