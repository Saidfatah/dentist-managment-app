import { addDoc, collection } from "firebase/firestore";
import { formatDate } from "../utils/formatDate";
import { db } from "./firebaseConfig";

const createClientInFirestore = async (clientData) => {
  try {
    const clientDataRes = await addDoc(collection(db, "clients"), {
      ...clientData,
    });

    return { ...clientData, id: clientDataRes.id };
  } catch (error) {
    console.log(error);
  }
};

const createClient = async (clientData, appointmentDate) => {
  const todaysDate = formatDate(new Date());

  const createdClient = await createClientInFirestore(clientData);

  if (appointmentDate == todaysDate) {
    const clientsFromCache = localStorage.getItem("TODAYS_CLIENTS");
    let newClients;

    if (clientsFromCache !== undefined && clientsFromCache !== null) {
      const { clients, day_of_creation } = JSON.parse(clientsFromCache);
      const current_day = new Date().getDay();

      if (current_day == day_of_creation)
        newClients = [createdClient, ...clients];
    } else newClients = [createdClient];

    localStorage.setItem(
      "TODAYS_CLIENTS",
      JSON.stringify({
        clients: newClients,
        day_of_creation: new Date().getDay(),
      })
    );
    return newClients;
  }

  return undefined;
};

export default createClient;
