import updateClientUpdateShapes from "../../../../services/updateClient.updateShapes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, { shapes }, state) => {
  try {
    const { id } = state.clients.visitedClient;
    const clientsVisitingToday = state.clients.clientsVisitingToday;
    const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];

    if (targetClient) {
      targetClient.shapes = [...shapes];
      updateClientUpdateShapes(clientsVisitingToday, id, shapes);

      dispatch.clients.updatedClientShapes({ clientsVisitingToday });

      dispatch.clients.getClientById({ id });
    }
  } catch (error) {
    console.log("updateShapes", error);
  }
};
