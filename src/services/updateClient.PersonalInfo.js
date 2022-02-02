import { updateDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateClientUpdatePersonalInfoInFirestore = async (id, updatedFields) => {
  try {
    const updates = Array.from(Object.keys(updatedFields)).reduce(
      (a, key) => ({ ...a, ["perosnalInfo." + key]: updatedFields[key] }),
      {}
    );
    const targetDocRef = doc(db, "clients/" + id);
    await updateDoc(targetDocRef, updates);
  } catch (error) {
    console.log(error);
  }
};

const updateClientUpdatePersonalInfo = async (
  newTodaysClients,
  id,
  updatedFields
) => {
  await updateClientUpdatePersonalInfoInFirestore(id, updatedFields);

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
