import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { formatDate } from "../utils/formatDate";

const getTodaysClientsFirestore = async () => {
  try {
    const date = formatDate(new Date());
    console.log(date);
    const q = query(
      collection(db, "clients"),
      where("appointments", "array-contains", {
        attended: false,
        control: false,
        date,
      })
    );
    const res = await getDocs(q);
    return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error);
  }
};

const getClients = async () => {
  console.log("getClients");
  let clients;
  const clientsFromCache = localStorage.getItem("TODAYS_CLIENTS");

  if (clientsFromCache != undefined && clientsFromCache != null) {
    const { clients, day_of_creation } = JSON.parse(clientsFromCache);
    const current_day = new Date().getDay();
    if (current_day == day_of_creation) {
      return clients;
    }
  }

  clients = await getTodaysClientsFirestore();
  console.log(clients);

  if (clients.length)
    localStorage.setItem(
      "TODAYS_CLIENTS",
      JSON.stringify({
        clients,
        day_of_creation: new Date().getDay(),
      })
    );
  return clients;
};

export default getClients;
