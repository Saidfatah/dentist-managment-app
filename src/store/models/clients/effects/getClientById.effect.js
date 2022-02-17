import getClientByIdService from "../../../../services/getClientByID";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, { id }, state) => {
  try {
    const clientsVisitingToday = state.clients.clientsVisitingToday;
    let targetClient;
    targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
    if (!undefined) targetClient = await getClientByIdService(id);

    if (targetClient) {
      const sessions = [...(targetClient.sessions || [])].map(
        ({ date, intervention, price, received, reste, toothNumber }) => ({
          date,
          toothNumber,
          intervention,
          price,
          received,
          reste,
        })
      );
      delete targetClient.sessions;
      dispatch.clients.fetchedClientByID({
        visitedClient: { ...targetClient, sessions },
      });
    }
  } catch (error) {
    console.log("error in : getClientById");
    console.log(error);
  }
};
