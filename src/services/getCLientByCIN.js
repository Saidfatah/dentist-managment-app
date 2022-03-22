import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const getClientByCINFromFirestore = async (searchText) => {
  try {
    console.log('getClientByCINFromFirestore')
    let client;
    const q = query(
      collection(db, "clients"),
      where("perosnalInfo.CIN", "==", searchText)
    );

    const querySnapshot = await getDocs(q);
   console.log(querySnapshot.docs)
    const docFetched = querySnapshot.docs[0];
    if (docFetched) client = { ...docFetched.data(), id: docFetched.id };

    return client;
  } catch (error) {
    console.log(error);
  }
};

const getClientByCIN = async (searchText) => {
  return await getClientByCINFromFirestore(searchText);
};

export default getClientByCIN;
