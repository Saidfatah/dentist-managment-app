import generateRefrence, {
  CLIENT_REF_PREFIX,
  REF_LENGTH,
} from "../../../../utils/generateRefrence";
import { appointmentSchema, clientSchema } from "../client.schema";
import createClient from "../../../../services/createClient";
import updateClientAddAppointment from "../../../../services/updateClient.addAppointment";
import { formatDate } from "../../../../utils/formatDate";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, { formData, isNew }, state) => {
  // create new appointment
  // create new client and set its appointment
  try {
    if (!formData) throw new Error("formData wasn't passed");
    dispatch.clients.startedAddingClient();
    const {
      firstName,
      lastName,
      age,
      phone,
      profession,
      CIN,
      address,
      isOrthoClient,
    } = formData;

    const appointmentDate = formatDate(formData.appointmentDate);

    const newAppoitment = appointmentSchema(appointmentDate);

    if (isNew) {
      const clientsCount = state.clients.clientsCount;
      const paymentsCount = state.clients.paymentsCount;
      const newClientRef = generateRefrence(
        clientsCount,
        CLIENT_REF_PREFIX,
        REF_LENGTH
      );
      const newClient = clientSchema(
        newClientRef,
        firstName,
        lastName,
        CIN,
        phone,
        age,
        profession,
        address,
        [],
        undefined,
        newAppoitment,
        isOrthoClient,
        undefined
      );

      const clientsVisitingToday = state.clients.clientsVisitingToday;

      const newClients = await createClient(newClient, appointmentDate, {
        clientsCount: clientsCount + 1,
        paymentsCount,
      });

      if (newClients && newClients.length)
        dispatch.clients.addedClient([...clientsVisitingToday, newClient]);
    } else {
      const { clientFound } = state.clients.searchedClient;

      await updateClientAddAppointment(
        undefined,
        clientFound.id,
        newAppoitment
      );
    }

    dispatch.clients.addedApointment();
    dispatch.clients.getTodaysClients();
  } catch (error) {
    console.log("addNewclient", error);
  }
};
