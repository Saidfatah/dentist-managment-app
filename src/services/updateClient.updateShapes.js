import { updateDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateClientUpdatePersonalInfoInFirestore = async (id, newShapes) => {
  try {
    const targetDocRef = doc(db, "clients/" + id);
    await updateDoc(targetDocRef, {
      shapes: newShapes,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClientUpdatePersonalInfo = async (
  newTodaysClients,
  id,
  newShapes
) => {
  await updateClientUpdatePersonalInfoInFirestore(id, newShapes);

  localStorage.setItem(
    "TODAYS_CLIENTS",
    JSON.stringify({
      clients: newTodaysClients,
      day_of_creation: new Date().getDay(),
    })
  );

  return undefined;
};

export default updateClientUpdatePersonalInfo;
