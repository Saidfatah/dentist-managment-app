import { sessionSchema } from "../client.schema";
import updateClientAddSession from "../../../../services/updateClient.addSession";

// eslint-disable-next-line import/no-anonymous-default-export
export default (dispatch, form, state) => {
  try {
    const { price, reste, received, intervention, toothNumber } = form;
    const session = sessionSchema(
      toothNumber,
      intervention,
      price,
      received,
      reste
    );

    const { id } = state.clients.visitedClient;
    const clientsVisitingToday = state.clients.clientsVisitingToday;
    const targetClient = clientsVisitingToday.filter((c) => c.id === id)[0];
    if (targetClient) {
      targetClient.sessions.push(session);
      // perssit to local storage
      // update client in firestore
      updateClientAddSession(clientsVisitingToday, id, session);

      dispatch.clients.addedSession({ clientsVisitingToday });
      dispatch.clients.getClientById({ id });
      if (received > 0) dispatch.register.addPayment({ amount: received });
    }
  } catch (error) {
    console.log("error in : addsession");
    console.log(error);
  }
};
