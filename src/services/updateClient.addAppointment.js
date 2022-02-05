import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateClientAddAppointmentsInFirestore = async (id, newAppointment) => {
  try {
    console.log({ id, newAppointment });
    const targetDocRef = doc(db, "clients/" + id);
    await updateDoc(targetDocRef, {
      appointments: arrayUnion(newAppointment),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClientAddAppointments = async (
  newTodaysClients,
  id,
  newAppointment
) => {
  await updateClientAddAppointmentsInFirestore(id, newAppointment);

  // localStorage.setItem(
  //   "TODAYS_CLIENTS",
  //   JSON.stringify({
  //     clients: newTodaysClients,
  //     day_of_creation: new Date().getDay(),
  //   })
  // );

  return undefined;
};

export default updateClientAddAppointments;
