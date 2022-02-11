import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const getClientByIdFromFirestore = async (id) => {
  try {
    const docRef = doc(db, "clients/" + id);
    const targetDocRef = await getDoc(docRef);
    const client = { ...targetDocRef.data(), id: targetDocRef.id };
    return client;
  } catch (error) {
    console.log(error);
  }
};

const getClientById = async (id) => {
  return await getClientByIdFromFirestore(id);
};

export default getClientById;
