import generateRefrence, {
  CLIENT_REF_PREFIX,
  REF_LENGTH,
} from "../../../../utils/generateRefrence";
import { appointmentSchema, clientSchema } from "../client.schema";
import createClient from "../../../../services/createClient";
import { formatDate } from "../../../../utils/formatDate";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, formData, state) => {
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
    const appointmentDate = formatDate(FormData.appointmentDate);

    const firstAppointment = appointmentSchema(appointmentDate);

    const clientsCount = state.clients.clientsCount;
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
      firstAppointment,
      isOrthoClient,
      undefined
    );

    const clientsVisitingToday = state.clients.clientsVisitingToday;

    const newClients = await createClient(newClient, appointmentDate);

    // this means that appointment date is same as today therfore
    // we should add client to todaysClients
    console.log(newClients);
    if (newClients && newClients.length) {
      dispatch.clients.addedClient([...clientsVisitingToday, newClient]);
      dispatch.clients.getTodaysClients();
    }
  } catch (error) {
    console.log("addNewclient", error);
  }
};
