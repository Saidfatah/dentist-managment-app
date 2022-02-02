import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateClientAddSessionInFirestore = async (id, newSession) => {
  try {
    const targetDocRef = doc(db, "clients/" + id);
    await updateDoc(targetDocRef, {
      sessions: arrayUnion(newSession),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClientAddSession = async (newTodaysClients, id, newSession) => {
  await updateClientAddSessionInFirestore(id, newSession);

  localStorage.setItem(
    "TODAYS_CLIENTS",
    JSON.stringify({
      clients: newTodaysClients,
      day_of_creation: new Date().getDay(),
    })
  );

  return undefined;
};

export default updateClientAddSession;
