import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateClientAddPaymentInFirestore = async (id, newPayment) => {
  try {
    const targetDocRef = doc(db, "clients/" + id);
    await updateDoc(targetDocRef, {
      payments: arrayUnion(newPayment),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClientAddPayment = async (id, newPayment, newTodaysClients) => {
  await updateClientAddPaymentInFirestore(id, newPayment);

  if (newTodaysClients) {
    localStorage.setItem(
      "TODAYS_CLIENTS",
      JSON.stringify({
        clients: newTodaysClients,
        day_of_creation: new Date().getDay(),
      })
    );
  }

  return undefined;
};

export default updateClientAddPayment;
