import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const getClientByFullNameFromFirestore = async (searchText) => {
  try {
    let client;
    const q = query(
      collection(db, "clients"),
      where("perosnalInfo.fullName", "==", searchText)
    );

    const querySnapshot = await getDocs(q);
    
    console.log('reaches here ')
    const docFetched = querySnapshot.docs[0];
    if (docFetched) client = { ...docFetched.data(), id: docFetched.id };

    return client;
  } catch (error) {
    console.log(error);
  }
};

const getClientByFullName = async (searchText) => {
  return await getClientByFullNameFromFirestore(searchText);
};

export default getClientByFullName;
